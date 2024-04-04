import { cache } from 'react'

import Image, { ImageProps } from "next/image";
import Container from "../_components/container";
import Header from "../_components/header";

export default async function Sketches() {
  // TODO: Implement infinite scrolling
  const props = await getImages(12);

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
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mb-16">
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
      </Container>
    </main>
  );
}

const getImages = cache(async (limit = 20) => {
  const res = await fetch(`https://inference-logs.khaifahmi99.workers.dev/lightning?limit=${limit}`)
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  const imageObjects: { imgId: string; createdAt: string; }[] = await res.json();
  const images = imageObjects.map(img => img.imgId);

  return images
})
