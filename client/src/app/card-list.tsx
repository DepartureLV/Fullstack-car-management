export const dynamic = "force-dynamic";

import Card from "@/components/card";
import { retrieveCarData } from "@/services/car";
import { Car } from "@/types/car";

export default async function CardList() {
  const data = await retrieveCarData();

  if (data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {data.map((car: Car) => (
          <Card key={car.id} data={car} />
        ))}
      </div>
    );
  }
}
