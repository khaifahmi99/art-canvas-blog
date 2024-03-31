import Avatar from "./avatar";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  author: Author;
};

export function SudokuHeader({ title, author }: Props) {
  return (
    <>
      <div className="mb-4 text-6xl font-bold tracking-tight">{title}</div>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </>
  );
}
