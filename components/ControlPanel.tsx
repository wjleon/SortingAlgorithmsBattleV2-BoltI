'use client';

import React from 'react';
import { ElementDistribution, SortingAlgorithm } from '@/types';
import { ALGORITHM_NAMES } from '@/lib/sortingAlgorithms';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface ControlPanelProps {
  algorithm1: SortingAlgorithm;
  algorithm2: SortingAlgorithm;
  numElements: number;
  distribution: ElementDistribution;
  isSorting: boolean;
  isPaused: boolean;
  soundEnabled: boolean;
  animationSpeed: number;
  onAlgorithm1Change: (algorithm: SortingAlgorithm) => void;
  onAlgorithm2Change: (algorithm: SortingAlgorithm) => void;
  onNumElementsChange: (numElements: number) => void;
  onDistributionChange: (distribution: ElementDistribution) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSoundToggle: () => void;
  onAnimationSpeedChange: (speed: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  algorithm1,
  algorithm2,
  numElements,
  distribution,
  isSorting,
  isPaused,
  soundEnabled,
  animationSpeed,
  onAlgorithm1Change,
  onAlgorithm2Change,
  onNumElementsChange,
  onDistributionChange,
  onStart,
  onPause,
  onReset,
  onSoundToggle,
  onAnimationSpeedChange,
}) => {
  // Create an array of all available algorithms for dropdowns
  const algorithmOptions = Object.entries(ALGORITHM_NAMES).map(
    ([key, name]) => ({ value: key as SortingAlgorithm, label: name })
  );

  // Handle number input changes with validation
  const handleNumElementsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 10 && value <= 200) {
      onNumElementsChange(value);
    }
  };

  return (
    <Card className="w-full mb-8">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Algorithm Selection */}
          <div className="space-y-2">
            <Label htmlFor="algorithm1">Algorithm 1 (Left Panel)</Label>
            <Select
              value={algorithm1}
              onValueChange={(value) => onAlgorithm1Change(value as SortingAlgorithm)}
              disabled={isSorting}
            >
              <SelectTrigger id="algorithm1">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                {algorithmOptions.map((algorithm) => (
                  <SelectItem key={algorithm.value} value={algorithm.value}>
                    {algorithm.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="algorithm2">Algorithm 2 (Right Panel)</Label>
            <Select
              value={algorithm2}
              onValueChange={(value) => onAlgorithm2Change(value as SortingAlgorithm)}
              disabled={isSorting}
            >
              <SelectTrigger id="algorithm2">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                {algorithmOptions.map((algorithm) => (
                  <SelectItem key={algorithm.value} value={algorithm.value}>
                    {algorithm.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Number of Elements */}
          <div className="space-y-2">
            <Label htmlFor="numElements">Number of Elements (10-200)</Label>
            <Input
              id="numElements"
              type="number"
              min={10}
              max={200}
              value={numElements}
              onChange={handleNumElementsChange}
              disabled={isSorting}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-end gap-2">
            <Button 
              onClick={onStart} 
              disabled={isSorting && !isPaused}
              className="flex-1"
            >
              {isPaused ? 'Resume' : 'Start'}
            </Button>
            <Button 
              onClick={onPause} 
              disabled={!isSorting || isPaused}
              variant="outline"
              className="flex-1"
            >
              Pause
            </Button>
            <Button 
              onClick={onReset} 
              variant="secondary"
              className="flex-1"
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Distribution Options */}
          <div className="space-y-2">
            <Label>Distribution of Elements</Label>
            <RadioGroup
              value={distribution}
              onValueChange={(value) => onDistributionChange(value as ElementDistribution)}
              disabled={isSorting}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="random" id="random" />
                <Label htmlFor="random">Random</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ascending" id="ascending" />
                <Label htmlFor="ascending">Sorted (ascending)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="descending" id="descending" />
                <Label htmlFor="descending">Sorted (descending)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ascendingHalves" id="ascendingHalves" />
                <Label htmlFor="ascendingHalves">Two ascending halves</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="descendingHalves" id="descendingHalves" />
                <Label htmlFor="descendingHalves">Two descending halves</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-6">
            {/* Animation Speed Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="animationSpeed">Animation Speed</Label>
                <span className="text-sm text-muted-foreground">
                  {animationSpeed === 1 ? 'Slow' : animationSpeed === 100 ? 'Fast' : 'Medium'}
                </span>
              </div>
              <Slider
                id="animationSpeed"
                min={1}
                max={100}
                step={1}
                value={[animationSpeed]}
                onValueChange={(value) => onAnimationSpeedChange(value[0])}
              />
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="soundToggle">Sound</Label>
              <Switch
                id="soundToggle"
                checked={soundEnabled}
                onCheckedChange={onSoundToggle}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;