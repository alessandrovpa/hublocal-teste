-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_company_id_fkey";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
