import { Car } from "@/types/car";

export default function Card({ data }: { data: Car }) {
  return (
    <div>
      {data.carBrand}, {data.carModel}
    </div>
  );
}
