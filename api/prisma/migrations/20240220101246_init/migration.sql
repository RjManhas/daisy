/*
  Warnings:

  - Added the required column `avatar` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "discordName" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "discordId" TEXT NOT NULL
);
INSERT INTO "new_user" ("discordId", "discordName", "email", "id") SELECT "discordId", "discordName", "email", "id" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE UNIQUE INDEX "user_discordId_key" ON "user"("discordId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
