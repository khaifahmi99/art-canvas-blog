import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getPaginatedPosts, getTotalPost } from "../lib/api";
import { POST_PAGE_SIZE } from "./_constant/pagination";
import Pagination from "./_components/pagination";

export default function Index({
  searchParams,
}: Props) {
  const page = Number(searchParams?.page) || 1;
  const posts = getPaginatedPosts(page, POST_PAGE_SIZE);
  const totalPosts = getTotalPost();

  const hasNextPage = page * POST_PAGE_SIZE < totalPosts;

  const heroPost = posts.at(0);
  const morePosts = posts.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        <div className="mb-32">
          <Pagination page={page} hasPreviousPage={page > 1} hasNextPage={hasNextPage} />
        </div>
      </Container>
    </main>
  );
}

interface Props {
  searchParams?: {
    page?: string;
  }
}