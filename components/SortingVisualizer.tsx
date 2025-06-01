'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ControlPanel from '@/components/ControlPanel';
import AlgorithmPanel from '@/components/AlgorithmPanel';
import { useSorting } from '@/hooks/useSorting';
import { generateArray } from '@/lib/arrayGenerator';
import { SortingAlgorithm, ElementDistribution, ArrayElement } from '@/types';
import { ALGORITHM_NAMES } from '@/lib/sortingAlgorithms';

const SortingVisualizer: React.FC = () => {
  // State for configuration
  const [algorithm1, setAlgorithm1] = useState<SortingAlgorithm>('bubble');
  const [algorithm2, setAlgorithm2] = useState<SortingAlgorithm>('quick');
  const [numElements, setNumElements] = useState<number>(30);
  const [distribution, setDistribution] = useState<ElementDistribution>('random');
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // State for sorting status
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [completedCount, setCompletedCount] = useState<number>(0);

  // Generate initial elements
  const initialElements = useMemo(() => {
    return generateArray(numElements, distribution);
  }, [numElements, distribution]);

  // Track whether both algorithms have completed
  const handleSortingComplete = useCallback(() => {
    setCompletedCount(prev => prev + 1);
  }, []);

  // Check if both algorithms are complete
  useEffect(() => {
    if (completedCount >= 2) {
      setIsSorting(false);
      setIsPaused(false);
    }
  }, [completedCount]);

  // Handle sorting for each algorithm
  const { elements: elements1, metrics: metrics1 } = useSorting({
    algorithm: algorithm1,
    initialElements,
    isRunning: isSorting,
    isPaused,
    animationSpeed,
    soundEnabled,
    onComplete: handleSortingComplete
  });

  const { elements: elements2, metrics: metrics2 } = useSorting({
    algorithm: algorithm2,
    initialElements,
    isRunning: isSorting,
    isPaused,
    animationSpeed,
    soundEnabled: false, // Disable sound for second algorithm to avoid cacophony
    onComplete: handleSortingComplete
  });

  // Control functions
  const handleStart = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsSorting(true);
      setCompletedCount(0);
    }
  }, [isPaused]);

  const handlePause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleReset = useCallback(() => {
    setIsSorting(false);
    setIsPaused(false);
    setCompletedCount(0);
  }, []);

  const handleDistributionChange = useCallback((newDistribution: ElementDistribution) => {
    setDistribution(newDistribution);
    // Reset sorting when distribution changes
    setIsSorting(false);
    setIsPaused(false);
    setCompletedCount(0);
  }, []);

  const handleNumElementsChange = useCallback((newNumElements: number) => {
    setNumElements(newNumElements);
    // Reset sorting when number of elements changes
    setIsSorting(false);
    setIsPaused(false);
    setCompletedCount(0);
  }, []);

  // Title formatting
  const panel1Title = `${ALGORITHM_NAMES[algorithm1]}: Sorting ${numElements} Elements`;
  const panel2Title = `${ALGORITHM_NAMES[algorithm2]}: Sorting ${numElements} Elements`;

  return (
    <div className="flex flex-col w-full h-full space-y-6">
      <ControlPanel
        algorithm1={algorithm1}
        algorithm2={algorithm2}
        numElements={numElements}
        distribution={distribution}
        isSorting={isSorting}
        isPaused={isPaused}
        soundEnabled={soundEnabled}
        animationSpeed={animationSpeed}
        onAlgorithm1Change={setAlgorithm1}
        onAlgorithm2Change={setAlgorithm2}
        onNumElementsChange={handleNumElementsChange}
        onDistributionChange={handleDistributionChange}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        onSoundToggle={() => setSoundEnabled(!soundEnabled)}
        onAnimationSpeedChange={setAnimationSpeed}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[70vh]">
        <AlgorithmPanel
          title={panel1Title}
          elements={elements1}
          metrics={metrics1}
          maxValue={numElements}
        />
        <AlgorithmPanel
          title={panel2Title}
          elements={elements2}
          metrics={metrics2}
          maxValue={numElements}
        />
      </div>
    </div>
  );
};

export default SortingVisualizer;