import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { AddressModule } from './address/address.module';
import { AdaptersModule } from './adapters/adapters.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    CompanyModule,
    AddressModule,
    AdaptersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
