import { test, expect, describe } from "@jest/globals";
import dotenv from "dotenv";
import { Car } from "../generated/prisma";

dotenv.config();

const PORT = process.env.PORT;

let testCarId = "";

describe("CREATE /cars", () => {
  const URL = `http://localhost:${PORT}/cars`;

  test("should return status 200", async () => {
    const payload: Omit<Car, "id"> = {
      carRegistrationNum: "ABC123",
      carBrand: "Honda City",
      carModel: "Sedan",
      notes: "This is a test car",
    };

    const resp = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await resp.json()) as Car;

    testCarId = data.id;

    expect(resp.status).toBe(200);
    expect(data.carRegistrationNum).toEqual("ABC123");
    expect(data.carBrand).toEqual("Honda City");
    expect(data.carModel).toEqual("Sedan");
    expect(data.notes).toEqual("This is a test car");
  });

  test("should not return status 200 when required field is not filled", async () => {
    const payload = {
      carRegistrationNum: "ABC123",
      carBrand: null,
      carModel: null,
      notes: "This is a test car",
    };

    const resp = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    expect(resp.status).not.toBe(200);
  });
});

describe("UPDATE /cars", () => {
  const URL = `http://localhost:${PORT}/cars`;

  test("should update the car details", async () => {
    const payload: Car = {
      id: testCarId,
      carRegistrationNum: "ABC456",
      carBrand: "Tesla",
      carModel: "Model Y",
      notes: "This is a test car 2",
    };

    const resp = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await resp.json()) as Car;

    expect(resp.status).toBe(200);
    expect(data.carRegistrationNum).toEqual("ABC456");
    expect(data.carBrand).toEqual("Tesla");
    expect(data.carModel).toEqual("Model Y");
    expect(data.notes).toEqual("This is a test car 2");
  });

  test("should not update the car details with invalid car id", async () => {
    const payload: Car = {
      id: "a1b2c3",
      carRegistrationNum: "ABC456",
      carBrand: "Tesla",
      carModel: "Model Y",
      notes: "This is a test car 2",
    };

    const resp = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await resp.json()) as Car;

    expect(resp.status).not.toBe(200);
  });
});

describe("RETREIVE /cars", () => {
  const URL = `http://localhost:${PORT}/cars`;

  test("should return status 200", async () => {
    const resp = await fetch(URL, { method: "GET" });
    expect(resp.status).toBe(200);
  });

  test("should return an array of Car", async () => {
    const resp = await fetch(URL, { method: "GET" });
    const data = (await resp.json()) as Car[];
    expect(Array.isArray(data)).toBe(true);
  });

  test("should return Car that have the required properties", async () => {
    const resp = await fetch(URL, { method: "GET" });
    const data = (await resp.json()) as Car[];

    data.forEach((car) => {
      // property
      expect(car).toHaveProperty("id");
      expect(car).toHaveProperty("carRegistrationNum");
      expect(car).toHaveProperty("carBrand");
      expect(car).toHaveProperty("carModel");
      expect(car).toHaveProperty("notes");

      // value type
      expect(typeof car.id).toBe("string");
      expect(typeof car.carRegistrationNum).toBe("string");
      expect(typeof car.carBrand).toBe("string");
      expect(typeof car.carModel).toBe("string");
      expect(typeof car.notes).toBe("string");
    });
  });
});

describe("DELETE /cars", () => {
  const URL = `http://localhost:${PORT}/cars`;

  test("should return status 200", async () => {
    const result = await fetch(`${URL}/${testCarId}`, {
      method: "DELETE",
    });
    expect(result.status).toBe(200);
  });

  test("should not return status 200 with invalid car id", async () => {
    const result = await fetch(`${URL}/a1b2c3`, {
      method: "DELETE",
    });
    expect(result.status).not.toBe(200);
  });
});
