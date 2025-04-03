"use server";

import { Car } from "@/types/car";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const retrieveCarData = async (): Promise<Car[]> => {
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
    console.error("1", error);
    return [];
  }
};

export const upsertCarData = async (carData: Car): Promise<void> => {
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

export const deleteCarData = async (id: string): Promise<void> => {
  try {
    const resp = await fetch(`${BASE_URL}/cars/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/cars");

    if (!resp.ok) throw Error;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
