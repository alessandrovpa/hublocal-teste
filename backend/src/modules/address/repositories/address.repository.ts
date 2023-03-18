import { Address } from '../entities/address.entity';

export abstract class AddressRepository {
  abstract create(address: Address): Promise<void>;
  abstract findById(id: string): Promise<Address | null>;
  abstract list(companyId: string): Promise<Address[]>;
  abstract delete(id: string): Promise<void>;
  abstract update(updatedAddress: Address): Promise<void>;
}
