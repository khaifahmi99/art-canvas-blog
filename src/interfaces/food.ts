export type Food = {
  id: string;
  images: string[];
  cuisine: string[];
  description: string;
  city: string;
  country: string;
  
  restaurantName?: string;

  createdAt: string;
  capturedOn: string;
}