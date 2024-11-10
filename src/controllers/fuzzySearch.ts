import product from "./../model/product"
// Fuzzy search algorithm to filter out matching searches. Static threshold of 2
export function fuzzySearch(search: string, array: product[]) {
    const result = array.filter((item) => {
      const word = search.toLowerCase();
      return levenshteinDistance(word, item.name.toLowerCase()) <= 2;
    });
    return result;
  }
  
  // Levenshtein distans algorithm to return a value of how accurate the match was
  function levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );
  
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + 1
          );
        }
      }
    }
    return matrix[a.length][b.length];
  }
  