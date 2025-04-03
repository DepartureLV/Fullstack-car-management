"use client";

import { Car } from "@/types/car";
import { deleteCarData, upsertCarData } from "@/services/car";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Form from "./form";
import { useState } from "react";
import { FormFieldProps } from "./form-field";
import { Button } from "./ui/button";

export default function Card({ data }: { data: Car }) {
  const [updatedCarData, setUpdatedCarData] = useState<Car>({
    ...data,
  });

  const carFormFields: FormFieldProps[] = [
    {
      id: "registration-number",
      label: "Car registration number",
      type: "text",
      placeholder: "AB 123",
      value: updatedCarData.carRegistrationNum,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUpdatedCarData({
          ...updatedCarData,
          carRegistrationNum: e.target.value,
        }),
    },
    {
      id: "brand",
      label: "Car brand",
      type: "text",
      placeholder: "Haup",
      value: updatedCarData.carBrand,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUpdatedCarData({
          ...updatedCarData,
          carBrand: e.target.value,
        }),
    },
    {
      id: "model",
      label: "Car model",
      type: "text",
      placeholder: "X20",
      value: updatedCarData.carModel,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUpdatedCarData({
          ...updatedCarData,
          carModel: e.target.value,
        }),
    },
    {
      id: "notes",
      label: "Notes",
      type: "text",
      placeholder: "",
      value: updatedCarData.notes || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUpdatedCarData({
          ...updatedCarData,
          notes: e.target.value,
        }),
    },
  ];

  const handleSubmitCarData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await upsertCarData(updatedCarData);
      // other logic if needed
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCarData = async () => {
    try {
      await deleteCarData(data.id as string);
      // other logic if needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col bg-blue-700 p-4 rounded-lg text-white w-full">
      <h1 className="text-xl p-0 m-0 font-semibold">
        {data.carBrand} {data.carModel}
      </h1>
      <p>
        car registration number:{" "}
        <b className="text-bold">{data.carRegistrationNum}</b>
      </p>
      {data.notes && <p>{data.notes}</p>}

      <Dialog>
        <DialogTrigger>Edit</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update your car</DialogTitle>
            <DialogDescription>Edit/Update your car details</DialogDescription>
            <Form
              id="updateForm"
              fields={carFormFields}
              handleSubmit={handleSubmitCarData}
            />
            <DialogClose asChild>
              <Button form="updateForm" type="submit" className="w-full">
                Submit
              </Button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Button onClick={handleDeleteCarData}>Delete</Button>
    </div>
  );
}
