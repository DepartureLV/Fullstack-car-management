import { Car } from "@/types/car";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const handleUpsertCarData = async (
  carData: Car
): Promise<{ data: Car; error: boolean } | void> => {
  try {
    const payload = {
      ...carData,
    };

    const resp = await fetch(`${BASE_URL}/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) throw Error;

    const data = (await resp.json()) as Car;

    return { data: data, error: false };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
