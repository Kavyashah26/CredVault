/*
  Warnings:

  - A unique constraint covering the columns `[userId,fingerprint]` on the table `user_fingerprints` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_fingerprints_fingerprint_key";

-- CreateIndex
CREATE UNIQUE INDEX "user_fingerprints_userId_fingerprint_key" ON "user_fingerprints"("userId", "fingerprint");
