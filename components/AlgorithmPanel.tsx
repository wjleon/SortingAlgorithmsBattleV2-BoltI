'use client';

import React from 'react';
import { ArrayElement, SortingMetrics } from '@/types';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AlgorithmPanelProps {
  title: string;
  elements: ArrayElement[];
  metrics: SortingMetrics;
  maxValue: number;
}

const AlgorithmPanel: React.FC<AlgorithmPanelProps> = ({
  title,
  elements,
  metrics,
  maxValue,
}) => {
  const { comparisons, timeElapsed, isComplete } = metrics;

  // Format time with 2 decimal places
  const formattedTime = timeElapsed.toFixed(2);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        <div className="text-sm text-muted-foreground">
          <p>Number of Comparisons: {comparisons.toLocaleString()}</p>
          <p>Time Elapsed: {formattedTime} seconds</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-2">
        <div className="h-full w-full flex flex-col-reverse justify-start items-center gap-1 overflow-y-auto">
          {elements.map((element, index) => (
            <div
              key={index}
              className="w-full h-[5px] flex items-center"
              title={`Value: ${element.value}`}
            >
              <div
                className={cn(
                  'h-full transition-all duration-100 ease-in-out',
                  {
                    'bg-primary': element.state === 'default',
                    'bg-yellow-500': element.state === 'comparing',
                    'bg-red-500': element.state === 'swapping',
                    'bg-green-500': element.state === 'sorted'
                  }
                )}
                style={{
                  width: `${(element.value / maxValue) * 100}%`,
                }}
              />
            </div>
          ))}
        </div>
      </CardContent>
      {isComplete && (
        <CardFooter className="pt-0">
          <p className="text-sm text-green-500">
            {title.split(':')[0]} finished sorting {elements.length} elements. 
            Comparisons: {comparisons.toLocaleString()}, Time: {formattedTime} seconds.
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default AlgorithmPanel;