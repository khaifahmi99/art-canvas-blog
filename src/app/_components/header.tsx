import Link from "next/link";
import Navbar from "./navbar";

export type Category = 'poem' | 'sudoku' | 'sketch';

interface Props {
  category: Category;
}

const Header = ({ category }: Props) => {
  return (
    <div className="relative">
      <div className="flex flex-row justify-between items-center mb-20 mt-8">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
          <Link href="/" className="hover:underline">
            The archives
          </Link>
          .
        </h2>
        <Navbar active={category} />
      </div>
    </div>
  );
};

export default Header;
