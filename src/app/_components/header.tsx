import Link from "next/link";

const Header = () => {
  return (
    <div className="relative">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <img className="invisible md:visible" src="/assets/blog/background/ivy.png" style={{
        position: 'absolute',
        top: 0,
        right: 0,

        width: '296px',

        zIndex: 100
      }} />
    </div>
  );
};

export default Header;
