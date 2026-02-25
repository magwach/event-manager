/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `booked_events` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reciptId]` on the table `booked_events` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reciept]` on the table `booked_events` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "booked_events_sessionId_key" ON "booked_events"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "booked_events_reciptId_key" ON "booked_events"("reciptId");

-- CreateIndex
CREATE UNIQUE INDEX "booked_events_reciept_key" ON "booked_events"("reciept");
