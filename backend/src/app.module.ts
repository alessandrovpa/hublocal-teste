import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CompanyModule } from '@modules/company/company.module';
import { AddressModule } from '@modules/address/address.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    CompanyModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
