-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "carRegistrationNum" INTEGER NOT NULL,
    "carModel" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_carRegistrationNum_key" ON "Car"("carRegistrationNum");
