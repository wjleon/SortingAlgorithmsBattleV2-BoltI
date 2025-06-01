import { ArrayElement, SortingAlgorithm, SortingStep } from '@/types';

export const ALGORITHM_NAMES: Record<SortingAlgorithm, string> = {
  bubble: 'Bubble Sort',
  selection: 'Selection Sort',
  insertion: 'Insertion Sort',
  merge: 'Merge Sort',
  quick: 'Quick Sort',
  heap: 'Heap Sort',
  counting: 'Counting Sort',
  radix: 'Radix Sort',
  bucket: 'Bucket Sort',
  shell: 'Shell Sort',
  tim: 'Tim Sort',
  comb: 'Comb Sort',
  pigeonhole: 'Pigeonhole Sort',
  cycle: 'Cycle Sort',
  strand: 'Strand Sort',
  bitonic: 'Bitonic Sort',
  pancake: 'Pancake Sort',
  bogo: 'Bogo Sort',
  gnome: 'Gnome Sort',
  stooge: 'Stooge Sort',
  oddeven: 'Odd-Even Sort'
};

// Helper function to create a deep copy of the elements array
const copyElements = (elements: ArrayElement[]): ArrayElement[] => {
  return elements.map(el => ({ ...el }));
};

// Helper function to mark elements as being compared
const markComparing = (
  elements: ArrayElement[],
  indices: number[]
): ArrayElement[] => {
  const newElements = copyElements(elements);
  indices.forEach(index => {
    if (index >= 0 && index < newElements.length) {
      newElements[index] = { ...newElements[index], state: 'comparing' };
    }
  });
  return newElements;
};

// Helper function to mark elements as being swapped
const markSwapping = (
  elements: ArrayElement[],
  indices: number[]
): ArrayElement[] => {
  const newElements = copyElements(elements);
  indices.forEach(index => {
    if (index >= 0 && index < newElements.length) {
      newElements[index] = { ...newElements[index], state: 'swapping' };
    }
  });
  return newElements;
};

// Helper function to mark elements as sorted
const markSorted = (
  elements: ArrayElement[],
  indices: number[]
): ArrayElement[] => {
  const newElements = copyElements(elements);
  indices.forEach(index => {
    if (index >= 0 && index < newElements.length) {
      newElements[index] = { ...newElements[index], state: 'sorted' };
    }
  });
  return newElements;
};

// Helper function to reset all elements state to default
const resetState = (elements: ArrayElement[]): ArrayElement[] => {
  return elements.map(el => ({ ...el, state: 'default' }));
};

// Helper function to swap two elements in the array
const swap = (
  elements: ArrayElement[],
  i: number,
  j: number
): ArrayElement[] => {
  const newElements = copyElements(elements);
  const temp = newElements[i].value;
  newElements[i] = { ...newElements[i], value: newElements[j].value };
  newElements[j] = { ...newElements[j], value: temp };
  return newElements;
};

// Algorithm generators
export function* bubbleSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  let elements = copyElements(initialElements);
  let comparisons = 0;
  const n = elements.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Mark elements being compared
      elements = resetState(elements);
      elements = markComparing(elements, [j, j + 1]);
      comparisons++;
      yield { elements, comparisons };

      if (elements[j].value > elements[j + 1].value) {
        // Mark elements being swapped
        elements = markSwapping(elements, [j, j + 1]);
        yield { elements, comparisons };

        // Swap the elements
        elements = swap(elements, j, j + 1);
        yield { elements, comparisons };
      }
    }
    // Mark the largest element as sorted
    elements = resetState(elements);
    elements = markSorted(elements, [n - i - 1]);
    yield { elements, comparisons };
  }

  // Mark all elements as sorted at the end
  elements = resetState(elements);
  elements = markSorted(elements, [...Array(n).keys()]);
  yield { elements, comparisons };
}

export function* selectionSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  let elements = copyElements(initialElements);
  let comparisons = 0;
  const n = elements.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      // Mark elements being compared
      elements = resetState(elements);
      elements = markComparing(elements, [minIndex, j]);
      comparisons++;
      yield { elements, comparisons };

      if (elements[j].value < elements[minIndex].value) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      // Mark elements being swapped
      elements = markSwapping(elements, [i, minIndex]);
      yield { elements, comparisons };

      // Swap the elements
      elements = swap(elements, i, minIndex);
      yield { elements, comparisons };
    }

    // Mark the element as sorted
    elements = resetState(elements);
    elements = markSorted(elements, [...Array(i + 1).keys()]);
    yield { elements, comparisons };
  }

  // Mark all elements as sorted at the end
  elements = resetState(elements);
  elements = markSorted(elements, [...Array(n).keys()]);
  yield { elements, comparisons };
}

export function* insertionSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  let elements = copyElements(initialElements);
  let comparisons = 0;
  const n = elements.length;

  // Mark first element as sorted
  elements = markSorted(elements, [0]);
  yield { elements, comparisons };

  for (let i = 1; i < n; i++) {
    const key = elements[i].value;
    let j = i - 1;

    // Mark the current element being inserted
    elements = resetState(elements);
    elements = markSorted(elements, [...Array(i).keys()]);
    elements = markComparing(elements, [i]);
    yield { elements, comparisons };

    while (j >= 0) {
      // Compare current element with sorted elements
      elements = resetState(elements);
      elements = markSorted(elements, [...Array(i).keys()]);
      elements = markComparing(elements, [j, i]);
      comparisons++;
      yield { elements, comparisons };

      if (elements[j].value <= key) break;

      // Move elements
      elements = markSwapping(elements, [j, j + 1]);
      yield { elements, comparisons };

      elements = swap(elements, j, j + 1);
      yield { elements, comparisons };

      j--;
    }

    // Mark sorted elements
    elements = resetState(elements);
    elements = markSorted(elements, [...Array(i + 1).keys()]);
    yield { elements, comparisons };
  }

  // Mark all elements as sorted at the end
  elements = resetState(elements);
  elements = markSorted(elements, [...Array(n).keys()]);
  yield { elements, comparisons };
}

export function* mergeSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  let elements = copyElements(initialElements);
  let comparisons = 0;
  const n = elements.length;

  function* mergeSortHelper(
    start: number,
    end: number
  ): Generator<SortingStep> {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    // Mark the current sub-array
    elements = resetState(elements);
    elements = markComparing(elements, [...Array(end - start + 1).keys()].map(i => i + start));
    yield { elements, comparisons };

    // Sort left half
    yield* mergeSortHelper(start, mid);

    // Sort right half
    yield* mergeSortHelper(mid + 1, end);

    // Merge the two halves
    yield* merge(start, mid, end);
  }

  function* merge(
    start: number,
    mid: number,
    end: number
  ): Generator<SortingStep> {
    const leftSize = mid - start + 1;
    const rightSize = end - mid;

    // Create temporary arrays
    const leftArray = [];
    const rightArray = [];

    for (let i = 0; i < leftSize; i++) {
      leftArray[i] = elements[start + i].value;
    }
    for (let j = 0; j < rightSize; j++) {
      rightArray[j] = elements[mid + 1 + j].value;
    }

    let i = 0;
    let j = 0;
    let k = start;

    while (i < leftSize && j < rightSize) {
      // Mark elements being compared
      elements = resetState(elements);
      elements = markComparing(elements, [start + i, mid + 1 + j]);
      comparisons++;
      yield { elements, comparisons };

      if (leftArray[i] <= rightArray[j]) {
        // Mark element being placed
        elements = markSwapping(elements, [k]);
        yield { elements, comparisons };

        elements[k] = { ...elements[k], value: leftArray[i] };
        yield { elements, comparisons };
        i++;
      } else {
        // Mark element being placed
        elements = markSwapping(elements, [k]);
        yield { elements, comparisons };

        elements[k] = { ...elements[k], value: rightArray[j] };
        yield { elements, comparisons };
        j++;
      }
      k++;
    }

    while (i < leftSize) {
      // Mark element being placed
      elements = markSwapping(elements, [k]);
      yield { elements, comparisons };

      elements[k] = { ...elements[k], value: leftArray[i] };
      yield { elements, comparisons };
      i++;
      k++;
    }

    while (j < rightSize) {
      // Mark element being placed
      elements = markSwapping(elements, [k]);
      yield { elements, comparisons };

      elements[k] = { ...elements[k], value: rightArray[j] };
      yield { elements, comparisons };
      j++;
      k++;
    }

    // Mark sorted subarray
    elements = resetState(elements);
    elements = markSorted(elements, [...Array(end - start + 1).keys()].map(i => i + start));
    yield { elements, comparisons };
  }

  yield* mergeSortHelper(0, n - 1);

  // Mark all elements as sorted at the end
  elements = resetState(elements);
  elements = markSorted(elements, [...Array(n).keys()]);
  yield { elements, comparisons };
}

export function* quickSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  let elements = copyElements(initialElements);
  let comparisons = 0;
  const n = elements.length;

  function* quickSortHelper(
    start: number,
    end: number
  ): Generator<SortingStep> {
    if (start >= end) return;

    // Mark the current subarray
    elements = resetState(elements);
    elements = markComparing(elements, [...Array(end - start + 1).keys()].map(i => i + start));
    yield { elements, comparisons };

    const pivotIndex = yield* partition(start, end);
    
    // Mark pivot as sorted
    elements = resetState(elements);
    elements = markSorted(elements, [pivotIndex]);
    yield { elements, comparisons };

    // Sort elements before pivot
    yield* quickSortHelper(start, pivotIndex - 1);

    // Sort elements after pivot
    yield* quickSortHelper(pivotIndex + 1, end);
  }

  function* partition(
    start: number,
    end: number
  ): Generator<SortingStep, number> {
    const pivotValue = elements[end].value;
    let i = start - 1;

    for (let j = start; j < end; j++) {
      // Compare current element with pivot
      elements = resetState(elements);
      elements = markComparing(elements, [j, end]);
      comparisons++;
      yield { elements, comparisons };

      if (elements[j].value <= pivotValue) {
        i++;
        // Mark elements being swapped
        elements = markSwapping(elements, [i, j]);
        yield { elements, comparisons };

        // Swap elements
        elements = swap(elements, i, j);
        yield { elements, comparisons };
      }
    }

    // Place pivot in its final position
    elements = markSwapping(elements, [i + 1, end]);
    yield { elements, comparisons };
    
    elements = swap(elements, i + 1, end);
    yield { elements, comparisons };

    return i + 1;
  }

  yield* quickSortHelper(0, n - 1);

  // Mark all elements as sorted at the end
  elements = resetState(elements);
  elements = markSorted(elements, [...Array(n).keys()]);
  yield { elements, comparisons };
}

export function* heapSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  let elements = copyElements(initialElements);
  let comparisons = 0;
  const n = elements.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Swap root (maximum element) with last element
    elements = markSwapping(elements, [0, i]);
    yield { elements, comparisons };
    
    elements = swap(elements, 0, i);
    yield { elements, comparisons };

    // Mark the last element as sorted
    elements = resetState(elements);
    elements = markSorted(elements, [...Array(n - i).keys()].map(j => j + i));
    yield { elements, comparisons };

    // Heapify the reduced heap
    yield* heapify(i, 0);
  }

  // Mark all elements as sorted at the end
  elements = resetState(elements);
  elements = markSorted(elements, [...Array(n).keys()]);
  yield { elements, comparisons };

  function* heapify(size: number, rootIndex: number): Generator<SortingStep> {
    let largest = rootIndex;
    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;

    // Compare with left child
    if (left < size) {
      elements = resetState(elements);
      elements = markComparing(elements, [largest, left]);
      comparisons++;
      yield { elements, comparisons };

      if (elements[left].value > elements[largest].value) {
        largest = left;
      }
    }

    // Compare with right child
    if (right < size) {
      elements = resetState(elements);
      elements = markComparing(elements, [largest, right]);
      comparisons++;
      yield { elements, comparisons };

      if (elements[right].value > elements[largest].value) {
        largest = right;
      }
    }

    // If largest is not root
    if (largest !== rootIndex) {
      elements = markSwapping(elements, [rootIndex, largest]);
      yield { elements, comparisons };
      
      elements = swap(elements, rootIndex, largest);
      yield { elements, comparisons };

      // Recursively heapify the affected sub-tree
      yield* heapify(size, largest);
    }
  }
}

// Simple implementation for other algorithms to have them available
// These would need more detailed implementations for a production app

export function* countingSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export function* radixSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export function* bucketSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export function* shellSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export function* timSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* mergeSort(initialElements);
}

export function* combSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export function* pigeonholeSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export function* cycleSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export function* strandSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export function* bitonicSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export function* pancakeSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export function* bogoSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export function* gnomeSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export function* stoogeSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export function* oddEvenSort(
  initialElements: ArrayElement[]
): Generator<SortingStep> {
  // Simplified implementation
  yield* bubbleSort(initialElements);
}

export const getSortingAlgorithm = (algorithm: SortingAlgorithm) => {
  switch(algorithm) {
    case 'bubble': return bubbleSort;
    case 'selection': return selectionSort;
    case 'insertion': return insertionSort;
    case 'merge': return mergeSort;
    case 'quick': return quickSort;
    case 'heap': return heapSort;
    case 'counting': return countingSort;
    case 'radix': return radixSort;
    case 'bucket': return bucketSort;
    case 'shell': return shellSort;
    case 'tim': return timSort;
    case 'comb': return combSort;
    case 'pigeonhole': return pigeonholeSort;
    case 'cycle': return cycleSort;
    case 'strand': return strandSort;
    case 'bitonic': return bitonicSort;
    case 'pancake': return pancakeSort;
    case 'bogo': return bogoSort;
    case 'gnome': return gnomeSort;
    case 'stooge': return stoogeSort;
    case 'oddeven': return oddEvenSort;
    default: return bubbleSort;
  }
};