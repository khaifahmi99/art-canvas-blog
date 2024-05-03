import Image, { ImageProps } from "next/image";
import Container from "../_components/container";
import Header from "../_components/header";
import { FOOD_PAGE_SIZE } from '../_constant/pagination';
import { getTotalFoods } from '@/lib/api';
import Pagination from '../_components/pagination';
import { Food } from '@/interfaces/food';

export default async function Foods({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1;
  const totalFoods = await getTotalFoods();

  const hasNextPage = page * FOOD_PAGE_SIZE < totalFoods;

  const props = await getImages(page);

  const url = "https://d3ae3kedxtitrj.cloudfront.net/food/";

  const images: ImageProps[] = props.map((image, i) => ({
    id: `${i}`,
    src: `${url}${image}`,
    alt: "sketch",
    public_id: image,
    height: 512,
    width: 512,
  }));

  return (
    <main>
      <Container>
        <Header category='food'/>
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
  const res = await fetch(`https://inference-logs.khaifahmi99.workers.dev/food?page=${page}&pageSize=${FOOD_PAGE_SIZE}`, {
    cache: 'no-store',
  })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  const foodRecords: Food[] = await res.json();
  const images = foodRecords.map(food => food.images[0]);

  return images
}

interface Props {
  searchParams?: {
    page?: string;
  }
}