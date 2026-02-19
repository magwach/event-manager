/*
  Warnings:

  - Added the required column `remainingCapacity` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "remainingCapacity" INTEGER NOT NULL;
