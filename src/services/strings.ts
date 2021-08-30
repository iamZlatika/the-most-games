const VOWELS = "aoeiuyàáâãäåæçèéêëìíîïðñòóôõöøšùúûüýÿþаеёиоуыэюя";

/**
 * Check if line id is valid
 * @param n line id to verify
 * @returns true if provided value is valid line number, false otherwise
 */
export const isValidLineNumber = (n: number | string) => {
    const lineNumber = typeof n === "string" ? Number(n.trim()) : n;
    return !Number.isNaN(lineNumber) 
        && Number.isInteger(lineNumber)
        && lineNumber > 0 && lineNumber <= 20
}

/**
 * Parse string of line ids
 * @param line string of line ids separated with comma or semicolon 
 * @returns list of valid line ids
 */
export const parseLines = (line: string) => {
  return line
    .split(/[,;]/)
    .map((v) => v.trim())
    .map((v) => Number(v))
    .filter(isValidLineNumber)
    .filter((v, idx, arr) => arr.indexOf(v) === idx)
};

/**
 * Count vowels
 * @param line string to process
 * @returns number of vowels
 */
export const countVowels = (line: string) => {
  let counter = 0;
  for (const letter of line.toLowerCase()) {
    if (VOWELS.includes(letter)) {
      counter++;
    }
  }
  return counter;
};

/**
 * Count words
 * @param line string to process
 * @returns number of words
 */
export const countWords = (line: string) =>
  line
    .replace(/[—,.;!?]+|\s+-|-\s+/g, " ")
    .split(/ +/)
    .filter((w) => w.length > 0).length;
