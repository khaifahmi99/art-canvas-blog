import { Author } from "./author"

export type Sudoku = {
  /**
   * First part represents that date "YYYY-MM-DD"
   * Second part represents the n puzzle of the date "r<number>"
   * Example: '2024-03-30r1'
   */
  id: string;
  author: Author;

  date: string;
  maskRate: number;
  content: string;
}