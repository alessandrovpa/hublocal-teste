-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "company_id" TEXT;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
