-- CreateTable
CREATE TABLE "todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_TodoToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TodoToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "todo" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TodoToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_TodoToUser_AB_unique" ON "_TodoToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TodoToUser_B_index" ON "_TodoToUser"("B");
