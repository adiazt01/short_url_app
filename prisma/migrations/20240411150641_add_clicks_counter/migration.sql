-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Url" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Url_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Url" ("id", "shortUrl", "url", "userId") SELECT "id", "shortUrl", "url", "userId" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
