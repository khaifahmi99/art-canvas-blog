import Image, { ImageProps } from "next/image";
import Container from "../_components/container";
import Header from "../_components/header";
import { FOOD_PAGE_SIZE } from '../_constant/pagination';
import { getTotalFoods } from '@/lib/api';
import Pagination from '../_components/pagination';
import { Food } from '@/interfaces/food';
import { getPlaiceholder } from "plaiceholder";

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
  const blurUrl = `${url}placeholder/`

  const foodsPromise: Promise<FoodWithImage[]> = Promise.all(props.map(async (food, i) => {
    const blurImage = `${blurUrl}${food.images}`
    const res = await fetch(blurImage);
    const buffer = Buffer.from(await res.arrayBuffer());
    const { base64: blurBase64 } = await getPlaiceholder(buffer);

    return {
      image: {
        id: `${i}`,
        src: `${url}${food.images}`,
        blurDataURL: blurBase64,
        public_id: food.images,
        height: 852,
        width: 640,
        alt: `food_${food.id}`,
      },
      food: {
        ...food,
        images: [food.images],
      },
    }
  }));

  const foods = await foodsPromise;

  return (
    <main>
      <Container>
        <Header category='food'/>
        <article className="mb-32">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-16">
            {foods.map(({food, image}) => (
              <div className='relative' key={food.id}>
                <Image
                  alt={image.alt}
                  className="rounded-lg mb-2 hover:brightness-50"
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
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

const getFoods = async (pageNumber = 1) => {
  if (pageNumber < 1) {
    return []
  }

  const res = await fetch('https://raw.githubusercontent.com/khaifahmi99/art-canvas-blog/main/public/assets/food/main.json', {
    cache: 'no-store',
  })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const rawFoods = await res.json();
  if (pageNumber * FOOD_PAGE_SIZE > rawFoods.foods.length) {
    return []
  }

  const startIndex = (pageNumber - 1) * FOOD_PAGE_SIZE;
  const endIndex = pageNumber * FOOD_PAGE_SIZE;
  const foodRecords: Food[] = (rawFoods.foods as RawFood[]).reverse().slice(startIndex, endIndex).map((rawFood, i) => ({
    id: `${i}`,
    images: rawFood['Images'],
    cuisine: rawFood['Cuisine'],
    description: rawFood['Description'],
    city: rawFood['Restaurant City'],
    country: rawFood['Restaurant Country'],

    restaurantName: rawFood['Restaurant Name'] ?? undefined,

    capturedOn: rawFood['Captured on'],
    createdAt: rawFood['Date'] ?? undefined,
  }));

  return foodRecords.map(food => ({
    ...food,
    images: food.images[0],
  }))

}

interface RawFood {
  "Images": string[];
  "Restaurant Name": string | null;
  "Cuisine": string[];
  "Description": string;
  "Restaurant City": string;
  "Restaurant Country": string;
  "Restaurant Coordinates": string | null;
  "Restaurant Link": string | null;
  "Captured on": string;
  "Date": string | null;
  "Set": string;
}

interface Props {
  searchParams?: {
    page?: string;
  }
}