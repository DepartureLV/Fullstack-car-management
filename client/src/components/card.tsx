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
import { CarFront, FileWarning, Trash } from "lucide-react";
import { Separator } from "./ui/separator";

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
      optional: false,
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
      optional: false,
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
      optional: false,
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
      optional: true,
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
    <div className="flex flex-col bg-white p-4 gap-4 rounded-lg w-full shadow-lg">
      <div className="mb-auto">
        <h1 className="text-xl text-primary !p-0 !m-0 font-semibold">
          {data.carBrand} {data.carModel}
        </h1>

        <Separator className="my-2" />

        <div className="flex gap-2 items-center">
          <span>
            <CarFront />
          </span>
          <p className="text-wrap">
            Car registration number:{" "}
            <b className="text-bold">{data.carRegistrationNum}</b>
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <span>
            <FileWarning />
          </span>
          <p>
            Note: <b className="text-bold">{data.notes || "-"}</b>
          </p>
        </div>
      </div>

      <div className="flex justify-between w-full gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full flex-1">Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update your car</DialogTitle>
              <DialogDescription>
                Edit/Update your car details
              </DialogDescription>
              <Form
                id="updateForm"
                fields={carFormFields}
                handleSubmit={handleSubmitCarData}
              />

              <Separator className="my-4" />

              <DialogClose asChild>
                <Button form="updateForm" type="submit" className="w-full">
                  Submit
                </Button>
              </DialogClose>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="text-destructive hover:text-destructive"
            >
              <Trash strokeWidth={3} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the
                data
              </DialogDescription>
              <DialogClose asChild>
                <Button
                  variant={"destructive"}
                  form="updateForm"
                  type="submit"
                  className="w-full"
                  onClick={handleDeleteCarData}
                >
                  Delete
                </Button>
              </DialogClose>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
