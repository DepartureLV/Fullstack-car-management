"use server";

import { Car } from "@/types/car";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const upsertCarData = async (
  carData: Car
): Promise<void> => {
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

    revalidatePath("/cars");

    if (!resp.ok) throw Error;

  } catch (error) {
    console.error(error);
    throw error;
  }
};