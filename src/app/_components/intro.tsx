import Navbar from "./navbar";

export function Intro() {
  return (
    <section className="flex-col items-center md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        The archives.
      </h1>
      <Navbar active="poem" />
    </section>
  );
}
