import Image, { ImageProps } from "next/image";
import Container from "../_components/container";
import Header from "../_components/header";
import { FOOD_PAGE_SIZE } from '../_constant/pagination';
import { getTotalFoods } from '@/lib/api';
import Pagination from '../_components/pagination';
import { Food } from '@/interfaces/food';

interface FoodWithImage {
  food: Food,
  image: ImageProps;
}

export default async function Foods({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1;
  const totalFoods = await getTotalFoods();

  const hasNextPage = page * FOOD_PAGE_SIZE < totalFoods;

  const props = await getFoods(page);

  const url = "https://d3ae3kedxtitrj.cloudfront.net/food/";

  const foods: FoodWithImage[] = props.map((food, i) => ({
    image: {
      id: `${i}`,
      src: `${url}${food.images}`,
      alt: "sketch",
      public_id: food.images,
      height: 512,
      width: 512,
    },
    food: {
      ...food,
      images: [food.images],
    },
  }));

  return (
    <main>
      <Container>
        <Header category='food'/>
        <article className="mb-32">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-16">
            {foods.map(({food, image}) => (
              <div className='relative'>
                <Image
                  alt={image.alt}
                  className="rounded-lg mb-2 hover:brightness-50"
                  src={image.src}
                  width={image.width}
                  height={image.height} 
                />
                <div className='absolute top-2 right-2 bg-opacity-50 bg-indigo-700 rounded-lg px-2 text-white cursor-default pointer-events-none'>
                  📸 {food.capturedOn}
                </div>
                <div className='main-section absolute bottom-0 inset-x-0 h-32 text-white pointer-events-none'>
                  <div className='p-2 truncate'>
                    <div className='main-header pb-4'>
                      <div className='text-lg font-bold'>
                          {food.restaurantName ? `📍 ${food.restaurantName}` : '🏪🧑‍🍳'}
                      </div>
                      <div className='italic'>
                        {food.city}, {food.country}
                      </div>
                    </div>
                    <div className='text-wrap'>
                      {food.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination page={page} hasPreviousPage={page > 1} hasNextPage={hasNextPage} />
        </article>
      </Container>
    </main>
  );
}

const getFoods = async (page = 1) => {
  const res = await fetch(`https://inference-logs.khaifahmi99.workers.dev/food?page=${page}&pageSize=${FOOD_PAGE_SIZE}`, {
    cache: 'no-store',
  })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  const foodRecords: Food[] = await res.json();
  return foodRecords.map(food => ({
    ...food,
    images: food.images[0],
    // FIXME: The DB should not store 'nan'
    restaurantName: food.restaurantName === 'nan' ? undefined : food.restaurantName,
  }))

}

interface Props {
  searchParams?: {
    page?: string;
  }
}