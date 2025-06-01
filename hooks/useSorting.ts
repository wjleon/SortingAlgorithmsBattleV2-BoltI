'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrayElement, SortingAlgorithm, SortingMetrics } from '@/types';
import { getSortingAlgorithm } from '@/lib/sortingAlgorithms';

interface UseSortingProps {
  algorithm: SortingAlgorithm;
  initialElements: ArrayElement[];
  isRunning: boolean;
  isPaused: boolean;
  animationSpeed: number;
  soundEnabled: boolean;
  onComplete?: () => void;
}

interface UseSortingReturn {
  elements: ArrayElement[];
  metrics: SortingMetrics;
}

interface SortingStep {
  elements: ArrayElement[];
  comparisons: number;
}

export const useSorting = ({
  algorithm,
  initialElements,
  isRunning,
  isPaused,
  animationSpeed,
  soundEnabled,
  onComplete
}: UseSortingProps): UseSortingReturn => {
  const [elements, setElements] = useState<ArrayElement[]>(initialElements);
  const [comparisons, setComparisons] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const sortGenerator = useRef<Generator<SortingStep> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number | null>(null);
  const audioContext = useRef<AudioContext | null>(null);

  // Initialize audio context if needed
  useEffect(() => {
    if (soundEnabled && !audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
        audioContext.current = null;
      }
    };
  }, [soundEnabled]);

  // Play sound based on element value
  const playSound = useCallback((value: number) => {
    if (!soundEnabled || !audioContext.current) return;

    try {
      const oscillator = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();

      // Map value to frequency between 200Hz and 1000Hz
      const maxValue = initialElements.length;
      const frequency = 200 + (value / maxValue) * 800;

      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gainNode.gain.value = 0.1; // Lower volume

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.current.destination);

      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.current.currentTime + 0.1);
      oscillator.stop(audioContext.current.currentTime + 0.1);
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  }, [soundEnabled, initialElements.length]);

  // Reset state when initialElements change
  useEffect(() => {
    setElements(initialElements);
    setComparisons(0);
    setTimeElapsed(0);
    setIsComplete(false);
    startTimeRef.current = null;
    sortGenerator.current = null;
  }, [initialElements]);

  // Handle sorting algorithm execution
  useEffect(() => {
    if (!isRunning || isPaused) {
      // Stop animation when not running or paused
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      prevTimeRef.current = null;
      return;
    }

    if (!sortGenerator.current) {
      // Initialize the sorting algorithm generator
      const sortAlgorithm = getSortingAlgorithm(algorithm);
      sortGenerator.current = sortAlgorithm(initialElements);
    }

    if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
    }

    // Function to advance the sorting algorithm
    const advanceSort = (timestamp: number) => {
      // Calculate elapsed time
      if (!prevTimeRef.current) {
        prevTimeRef.current = timestamp;
      }

      const elapsed = timestamp - prevTimeRef.current;
      const delayBetweenSteps = Math.max(1, 500 / animationSpeed); // Inverse relationship to speed

      let result = undefined;

      // Only process a step if enough time has passed (based on animation speed)
      if (elapsed >= delayBetweenSteps) {
        prevTimeRef.current = timestamp;

        // Get the next step from the generator
        result = sortGenerator.current?.next();
        
        if (result?.value) {
          const { elements: newElements, comparisons: newComparisons } = result.value as SortingStep;
          setElements([...newElements]);
          setComparisons(newComparisons);
          
          // Play sound based on elements being compared or swapped
          const activeElement = newElements.find(el => el.state === 'comparing' || el.state === 'swapping');
          if (activeElement) {
            playSound(activeElement.value);
          }
        }

        // Update elapsed time
        const currentTimeElapsed = (timestamp - (startTimeRef.current || timestamp)) / 1000;
        setTimeElapsed(currentTimeElapsed);
      }

      if (result?.done) {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
        return;
      }

      // Continue animation if not done
      animationFrameRef.current = requestAnimationFrame(advanceSort);
    };

    // Start the animation
    animationFrameRef.current = requestAnimationFrame(advanceSort);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [algorithm, initialElements, isRunning, isPaused, animationSpeed, soundEnabled, playSound, onComplete]);

  return {
    elements,
    metrics: {
      comparisons,
      timeElapsed,
      isComplete
    }
  };
};