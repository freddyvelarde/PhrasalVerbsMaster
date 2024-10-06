-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phrasal_Verb" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "pronunciation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Phrasal_Verb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Phrasal_Verb" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "phrasal_verb_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Phrasal_Verb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Phrasal_Verb_user_id_phrasal_verb_id_key" ON "User_Phrasal_Verb"("user_id", "phrasal_verb_id");

-- AddForeignKey
ALTER TABLE "User_Phrasal_Verb" ADD CONSTRAINT "User_Phrasal_Verb_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Phrasal_Verb" ADD CONSTRAINT "User_Phrasal_Verb_phrasal_verb_id_fkey" FOREIGN KEY ("phrasal_verb_id") REFERENCES "Phrasal_Verb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
