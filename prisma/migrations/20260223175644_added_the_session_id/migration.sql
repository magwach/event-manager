/*
  Warnings:

  - You are about to drop the column `paymentId` on the `booked_events` table. All the data in the column will be lost.
  - You are about to drop the column `reciptNumber` on the `booked_events` table. All the data in the column will be lost.
  - Added the required column `reciptId` to the `booked_events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `booked_events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booked_events" DROP COLUMN "paymentId",
DROP COLUMN "reciptNumber",
ADD COLUMN     "reciptId" TEXT NOT NULL,
ADD COLUMN     "sessionId" TEXT NOT NULL;
