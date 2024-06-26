import Link from "next/link";
import { Category } from "./header";

interface Props {
  active: Category;
}

const items = [
  {
    title: 'Poem',
    href: '/',
    compareValue: 'poem',
  },
  {
    title: 'Sudoku',
    href: '/sudoku',
    compareValue: 'sudoku',
  },
  {
    title: 'Sketch',
    href: '/sketches',
    compareValue: 'sketch',
  }
]

const Navbar = ({ active }: Props) => {
  return (
    <div className="flex flex-row space-x-4 text-lg">
      {items.map(item => {
        return (
          <Link href={item.href} key={item.href} className={active === item.compareValue ? 'font-bold text-indigo-800 px-2' : 'px-2'}>
            {item.title}
          </Link>
        )

      })}
    </div>
  )
}

export default Navbar;