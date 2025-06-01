import { ArrayElement, ElementDistribution } from '@/types';

/**
 * Generates an array of elements based on the specified size and distribution
 */
export const generateArray = (size: number, distribution: ElementDistribution): ArrayElement[] => {
  const values = Array.from({ length: size }, (_, i) => i + 1);
  
  switch (distribution) {
    case 'random':
      shuffleArray(values);
      break;
    case 'ascending':
      // Already sorted
      break;
    case 'descending':
      values.reverse();
      break;
    case 'ascendingHalves':
      const midAsc = Math.floor(size / 2);
      const firstHalfAsc = values.slice(0, midAsc);
      const secondHalfAsc = values.slice(midAsc);
      values.splice(0, size, ...firstHalfAsc, ...secondHalfAsc);
      break;
    case 'descendingHalves':
      const midDesc = Math.floor(size / 2);
      const firstHalfDesc = values.slice(0, midDesc).reverse();
      const secondHalfDesc = values.slice(midDesc).reverse();
      values.splice(0, size, ...firstHalfDesc, ...secondHalfDesc);
      break;
    default:
      shuffleArray(values);
  }

  return values.map(value => ({
    value,
    state: 'default'
  }));
};

/**
 * Shuffles an array in place
 */
function shuffleArray(array: number[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}