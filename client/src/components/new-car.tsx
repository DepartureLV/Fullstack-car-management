"use client";

import { useState } from "react";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Car } from "@/types/car";
import { upsertCarData } from "@/services/car";
import Form from "./form";
import { FormFieldProps } from "./form-field";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Separator } from "./ui/separator";

export default function NewCar() {
  const [newCarData, setNewCarData] = useState<Omit<Car, "id">>({
    carRegistrationNum: "",
    carBrand: "",
    carModel: "",
    notes: "",
  });

  const carFormFields: FormFieldProps[] = [
    {
      id: "registration-number",
      label: "Car registration number",
      type: "text",
      placeholder: "AB 123",
      value: newCarData.carRegistrationNum,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewCarData({
          ...newCarData,
          carRegistrationNum: e.target.value,
        }),
      optional: false,
    },
    {
      id: "brand",
      label: "Car brand",
      type: "text",
      placeholder: "Haup",
      value: newCarData.carBrand,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewCarData({
          ...newCarData,
          carBrand: e.target.value,
        }),
      optional: false,
    },
    {
      id: "model",
      label: "Car model",
      type: "text",
      placeholder: "X20",
      value: newCarData.carModel,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewCarData({
          ...newCarData,
          carModel: e.target.value,
        }),
      optional: false,
    },
    {
      id: "notes",
      label: "Notes",
      type: "text",
      placeholder: "",
      value: newCarData.notes || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewCarData({
          ...newCarData,
          notes: e.target.value,
        }),
      optional: true,
    },
  ];

  const handleSubmitCarData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await upsertCarData(newCarData);
      setNewCarData({
        carRegistrationNum: "",
        carBrand: "",
        carModel: "",
        notes: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 w-full hover:gap-3">
          New <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-5xl text-primary">
            Add new car
          </DialogTitle>
          <DialogDescription>
            Add a new car to your collection
          </DialogDescription>
          <Form
            id="newCarForm"
            fields={carFormFields}
            handleSubmit={handleSubmitCarData}
          />

          <Separator className="my-4" />

          <DialogClose asChild>
            <Button form="newCarForm" type="submit" className="w-full">
              Submit
            </Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
