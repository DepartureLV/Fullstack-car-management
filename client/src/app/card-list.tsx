import Card from "@/components/card";
import { Car } from "@/types/car";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function CardList() {
  const handleGetCarsData = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/cars`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await resp.json()) as Car[];

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const data = await handleGetCarsData();

  if (data) {
    return (
      <>
        {data.map((car: Car) => (
          <Card key={car.id} data={car} />
        ))}
      </>
    );
  }
}
