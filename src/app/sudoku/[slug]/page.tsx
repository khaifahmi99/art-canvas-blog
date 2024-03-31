import { getSudokuBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Container from "../../_components/container";
import Header from "../../_components/header";
import { SudokuBody } from "../../_components/sudoku-body";

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
          <h1 className="mb-4 text-3xl font-bold tracking-tight">{date.toDateString()}</h1>
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