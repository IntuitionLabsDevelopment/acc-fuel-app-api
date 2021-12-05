-- CreateEnum
CREATE TYPE "TrackTypes" AS ENUM ('Oval', 'Road');

-- CreateEnum
CREATE TYPE "carTrackTypes" AS ENUM ('Road', 'Oval', 'Both');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Sim" (
    "simId" SERIAL NOT NULL,
    "simName" TEXT NOT NULL,

    CONSTRAINT "Sim_pkey" PRIMARY KEY ("simId")
);

-- CreateTable
CREATE TABLE "Track" (
    "trackId" SERIAL NOT NULL,
    "trackName" TEXT NOT NULL,
    "trackLength" INTEGER NOT NULL,
    "trackLocation" TEXT NOT NULL,
    "trackType" "TrackTypes" NOT NULL,
    "simId" INTEGER NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("trackId")
);

-- CreateTable
CREATE TABLE "CarManufacturer" (
    "manufacturerId" SERIAL NOT NULL,
    "manufacturerName" TEXT NOT NULL,

    CONSTRAINT "CarManufacturer_pkey" PRIMARY KEY ("manufacturerId")
);

-- CreateTable
CREATE TABLE "Car" (
    "carId" SERIAL NOT NULL,
    "carManufacturerId" INTEGER NOT NULL,
    "carName" TEXT NOT NULL,
    "carClass" TEXT NOT NULL,
    "typesOfTracks" "carTrackTypes" NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("carId")
);

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_simId_fkey" FOREIGN KEY ("simId") REFERENCES "Sim"("simId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carManufacturerId_fkey" FOREIGN KEY ("carManufacturerId") REFERENCES "CarManufacturer"("manufacturerId") ON DELETE RESTRICT ON UPDATE CASCADE;
