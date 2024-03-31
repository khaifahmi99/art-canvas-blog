import { getSudokuBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Container from "../../_components/container";
import Header from "../../_components/header";
import { SudokuBody } from "../../_components/sudoku-body";
import { SudokuHeader } from "../../_components/sudoku-header";

export default async function Sudoku({ params }: Params) {
  const sudoku = getSudokuBySlug(params.slug);

  if (!sudoku) {
    return notFound();
  }

  const date = new Date(sudoku.date);
  const rows = JSON.parse(sudoku.content);

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <SudokuHeader title={date.toDateString()} author={sudoku.author} />
          <SudokuBody rows={rows} />
        </article>
      </Container>
    </main>
  )
}

type Params = {
  params: {
    slug: string;
  };
};