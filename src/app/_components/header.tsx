import Link from "next/link";

interface Props {
  category: 'poem' | 'sudoku' | 'sketch';
}

const Header = ({ category }: Props) => {
  return (
    <div className="relative">
      <div className="flex mb-20 mt-8">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
          <Link href="/" className="hover:underline">
            The archives
          </Link>
          .
        </h2>
        <h3 className="text-md font-italic">({category})</h3>
      </div>
      {category === 'poem' && (
        <img className="invisible md:visible" src="/assets/blog/background/ivy.png" style={{
          position: 'absolute',
          top: 0,
          right: 0,
  
          width: '296px',
  
          zIndex: 100
        }} />
      )}
    </div>
  );
};

export default Header;
