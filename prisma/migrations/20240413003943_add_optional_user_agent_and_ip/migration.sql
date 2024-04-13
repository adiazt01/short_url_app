-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Click" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urlId" INTEGER NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Click_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Click" ("createdAt", "id", "ip", "updatedAt", "urlId", "userAgent") SELECT "createdAt", "id", "ip", "updatedAt", "urlId", "userAgent" FROM "Click";
DROP TABLE "Click";
ALTER TABLE "new_Click" RENAME TO "Click";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
