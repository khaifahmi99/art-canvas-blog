import { getAllSudokues } from "@/lib/api";
import Header from "../_components/header";
import Container from "../_components/container";
import { Sudoku } from "@/interfaces/sudoku";
import Link from "next/link";

export default async function SudokuList() {
  const sudokus = getAllSudokues();

  const sortedSudokus = sudokus.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // group by date.toDateString()
  const groups = sortedSudokus.reduce((acc, sudoku) => {
    const date = new Date(sudoku.date).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(sudoku);
    return acc;
  }, {} as Record<string, Sudoku[]>);

  return (
    <main>
      <Container>
        <Header category="sudoku" />
        <article className="mb-32">
          {Object.keys(groups).map(date => (
            <div key={date} className="mb-8">
              <h2 className="text-md italic font-light mb-2">{date}</h2>
                {groups[date].map((sudoku, idx, sArray) => (
                  <div key={sudoku.id} className='pb-4'>
                    <h3 className="text-xl font-bold leading-snug">
                      <Link as={`/sudoku/${sudoku.id}`} href="/sudoku/[id]"
                        className="hover:underline"
                      >
                        Code Reference {sArray.length - idx}
                      </Link>
                      <span className='pl-2 font-light text-sm'>({(sudoku.id).slice(0, 8)})</span>
                    </h3>
                    <span className='text-sm'>by {sudoku.author.name}</span>
                  </div>
                ))}
            </div>
          ))}
        </article>
      </Container>
    </main>
  )
}