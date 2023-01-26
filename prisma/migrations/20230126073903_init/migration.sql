-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Respondent" (
    "id" SERIAL NOT NULL,
    "phone_number" TEXT,

    CONSTRAINT "Respondent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questionnaire" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questionnaire_Questions" (
    "id" SERIAL NOT NULL,
    "questionare_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "optional" BOOLEAN NOT NULL,
    "choices" TEXT[],

    CONSTRAINT "Questionnaire_Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responses" (
    "id" SERIAL NOT NULL,
    "questionare_question_id" INTEGER NOT NULL,
    "values" TEXT[],
    "respondent_id" INTEGER NOT NULL,

    CONSTRAINT "Responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topups" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" INTEGER,

    CONSTRAINT "Topups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payouts" (
    "id" SERIAL NOT NULL,
    "respondent_id" INTEGER NOT NULL,
    "amount" INTEGER,
    "questionare_id" INTEGER NOT NULL,

    CONSTRAINT "Payouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Questionnaire_user_id_key" ON "Questionnaire"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Questionnaire_Questions_questionare_id_key" ON "Questionnaire_Questions"("questionare_id");

-- CreateIndex
CREATE UNIQUE INDEX "Responses_questionare_question_id_key" ON "Responses"("questionare_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "Responses_respondent_id_key" ON "Responses"("respondent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Topups_user_id_key" ON "Topups"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payouts_respondent_id_key" ON "Payouts"("respondent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payouts_questionare_id_key" ON "Payouts"("questionare_id");

-- AddForeignKey
ALTER TABLE "Questionnaire" ADD CONSTRAINT "Questionnaire_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questionnaire_Questions" ADD CONSTRAINT "Questionnaire_Questions_questionare_id_fkey" FOREIGN KEY ("questionare_id") REFERENCES "Questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_questionare_question_id_fkey" FOREIGN KEY ("questionare_question_id") REFERENCES "Questionnaire_Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_respondent_id_fkey" FOREIGN KEY ("respondent_id") REFERENCES "Respondent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topups" ADD CONSTRAINT "Topups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payouts" ADD CONSTRAINT "Payouts_respondent_id_fkey" FOREIGN KEY ("respondent_id") REFERENCES "Respondent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payouts" ADD CONSTRAINT "Payouts_questionare_id_fkey" FOREIGN KEY ("questionare_id") REFERENCES "Questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
