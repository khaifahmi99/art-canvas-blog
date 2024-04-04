import { Post } from "@/interfaces/post";
import { Sudoku } from "@/interfaces/sudoku";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");
const sudokuDirectory = join(process.cwd(), "_sudoku");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getTotalPost() {
  return getPostSlugs().length;
}

export function getSudokuSlugs() {
  return fs.readdirSync(sudokuDirectory);
}

export function getTotalSudoku() {
  return getSudokuSlugs().length;
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const tags: string[] = [];

  if (Array.isArray(data.tags)) {
    tags.push(...data.tags);
  } else {
    const parsedTags = (data.tags as string).split(",");
    tags.push(...parsedTags);
  }

  return { ...data, slug: realSlug, content, tags } as Post;
}

export function getSudokuBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(sudokuDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return data as Sudoku;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllSudokues(): Sudoku[] {
  const slugs = getSudokuSlugs();
  const sudokus = slugs
    .map((slug) => getSudokuBySlug(slug))
    .sort((a, b) => a.date > b.date ? -1 : 1);
  return sudokus;
}

export function getPaginatedSudokues(page: number = 1, pageSize: number = 20): Sudoku[] {
  if (page <= 0) {
    page = 1;
  }

  if (pageSize <= 0) {
    pageSize = 20;
  }

  const all = getAllSudokues();
  return all.slice((page - 1) * pageSize, page * pageSize);
}