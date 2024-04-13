/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ip` to the `Click` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAgent` to the `Click` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Group_name_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Click" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urlId" INTEGER NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Click_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Click" ("createdAt", "id", "updatedAt", "urlId") SELECT "createdAt", "id", "updatedAt", "urlId" FROM "Click";
DROP TABLE "Click";
ALTER TABLE "new_Click" RENAME TO "Click";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_userId_key" ON "Group"("name", "userId");
