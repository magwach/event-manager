/*
  Warnings:

  - You are about to drop the column `reciept` on the `booked_events` table. All the data in the column will be lost.
  - You are about to drop the column `reciptId` on the `booked_events` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[receiptId]` on the table `booked_events` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receipt]` on the table `booked_events` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receipt` to the `booked_events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiptId` to the `booked_events` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "booked_events_reciept_key";

-- DropIndex
DROP INDEX "booked_events_reciptId_key";

-- AlterTable
ALTER TABLE "booked_events" DROP COLUMN "reciept",
DROP COLUMN "reciptId",
ADD COLUMN     "receipt" TEXT NOT NULL,
ADD COLUMN     "receiptId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "booked_events_receiptId_key" ON "booked_events"("receiptId");

-- CreateIndex
CREATE UNIQUE INDEX "booked_events_receipt_key" ON "booked_events"("receipt");
