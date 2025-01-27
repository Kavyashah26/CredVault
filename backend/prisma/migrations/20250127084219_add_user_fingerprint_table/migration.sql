-- CreateTable
CREATE TABLE "user_fingerprints" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_fingerprints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_fingerprints_fingerprint_key" ON "user_fingerprints"("fingerprint");

-- AddForeignKey
ALTER TABLE "user_fingerprints" ADD CONSTRAINT "user_fingerprints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
