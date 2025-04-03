"use client";

import { Car } from "@/types/car";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Form from "./form";
import { useState } from "react";
import { FormFieldProps } from "./form-field";
import { handleUpsertCarData } from "@/services/carFormHandlers";

export default function Card({ data }: { data: Car }) {
  const [carData, setCarData] = useState(data);
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
      await handleUpsertCarData(updatedCarData);

      setCarData(updatedCarData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col bg-blue-700 p-4 rounded-lg text-white w-full">
      <h1 className="text-xl p-0 m-0 font-semibold">
        {carData.carBrand} {carData.carModel}
      </h1>
      <p>
        car registration number:{" "}
        <b className="text-bold">{carData.carRegistrationNum}</b>
      </p>
      {carData.notes && <p>{carData.notes}</p>}

      <Dialog>
        <DialogTrigger>Edit</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update your car</DialogTitle>
            <DialogDescription>Edit/Update your car details</DialogDescription>
            <Form fields={carFormFields} handleSubmit={handleSubmitCarData} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
