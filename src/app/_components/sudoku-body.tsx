type Row = number[];

type Props = {
  rows: Row[];
};

export function SudokuBody({ rows }: Props) {

  return (
    <div className="min-w-xl max-w-xl">
      <div className="grid grid-cols-9 border-slate-500 border-t-4 border-l-4">
        {rows.flatMap(r => r).map((cell, i) => {
          const colN = i % 9;
          const rowN = Math.floor(i / 9);

          console.log(colN, rowN);

          const borderBottom = rowN === 2 || rowN === 5 || rowN === 8 ? 'border-b-4' : 'border-b-2';
          const borderRight = colN === 2 || colN === 5 || colN === 8 ? 'border-r-4' : 'border-r-2';

          const borderClasses = `border-slate-400 ${borderBottom} ${borderRight}`;

          return (
            <div
              className={`flex items-center p-1 text-center text-xl w-16 h-16 mx-auto ${borderClasses}`}
              key={i}
            >
              <span className="w-full">{cell === 0 ? '' : cell}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
