export type SortingAlgorithm =
  | 'bubble'
  | 'selection'
  | 'insertion'
  | 'merge'
  | 'quick'
  | 'heap'
  | 'counting'
  | 'radix'
  | 'bucket'
  | 'shell'
  | 'tim'
  | 'comb'
  | 'pigeonhole'
  | 'cycle'
  | 'strand'
  | 'bitonic'
  | 'pancake'
  | 'bogo'
  | 'gnome'
  | 'stooge'
  | 'oddeven';

export type AlgorithmName = {
  [key in SortingAlgorithm]: string;
};

export type ElementDistribution = 
  | 'random'
  | 'ascending'
  | 'descending'
  | 'ascendingHalves'
  | 'descendingHalves';

export interface ArrayElement {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted';
}

export interface SortingMetrics {
  comparisons: number;
  timeElapsed: number;
  isComplete: boolean;
}

export interface SortingVisualizerProps {
  algorithm: SortingAlgorithm;
  elements: ArrayElement[];
  metrics: SortingMetrics;
  panelTitle: string;
}

export interface SortingStep {
  elements: ArrayElement[];
  comparisons: number;
}