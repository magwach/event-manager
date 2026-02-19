/*
  Warnings:

  - Added the required column `reciptNumber` to the `booked_events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booked_events" ADD COLUMN     "reciptNumber" TEXT NOT NULL;
