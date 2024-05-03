import Image, { ImageProps } from "next/image";
import Container from "../_components/container";
import Header from "../_components/header";
import { SKETCH_PAGE_SIZE } from '../_constant/pagination';
import { getTotalSketches } from '@/lib/api';
import Pagination from '../_components/pagination';

export default async function Sketches({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1;
  const totalSketches = await getTotalSketches();

  const hasNextPage = page * SKETCH_PAGE_SIZE < totalSketches;

  const props = await getImages(page);

  const url = "https://db7xy78dts6xn.cloudfront.net/lightning/";

  const images: ImageProps[] = props.map((image, i) => ({
    id: `${i}`,
    src: `${url}${image}.png`,
    alt: "sketch",
    public_id: image,
    height: 512,
    width: 512,
  }));

  return (
    <main>
      <Container>
        <Header category='sketch'/>
        <article className="mb-32">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-16">
            {images.map((image) => (
              <Image
                alt={image.alt}
                className="hover:scale-110 transition duration-200 ease-in-out 
                  rounded-lg mb-2 brightness-75 contrast-125 hover:brightness-100"
                src={image.src}
                width={image.width}
                height={image.height} />
            ))}
          </div>
          <Pagination page={page} hasPreviousPage={page > 1} hasNextPage={hasNextPage} />
        </article>
      </Container>
    </main>
  );
}

const getImages = async (page = 1) => {
  const res = await fetch(`https://inference-logs.khaifahmi99.workers.dev/lightning?page=${page}&pageSize=${SKETCH_PAGE_SIZE}`, {
    cache: 'no-store',
  })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  const imageObjects: { imgId: string; createdAt: string; }[] = await res.json();
  const images = imageObjects.map(img => img.imgId);

  return images
}

interface Props {
  searchParams?: {
    page?: string;
  }
}