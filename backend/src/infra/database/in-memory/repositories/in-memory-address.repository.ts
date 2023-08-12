import { Address } from '@domain/address/address.entity';
import { AddressRepository } from '@domain/address/address.repository';

export class InMemoryAddressRepository implements AddressRepository {
  public addresses: Address[];

  constructor() {
    this.addresses = [];
  }

  async create(address: Address): Promise<void> {
    this.addresses.push(address);
  }

  async findById(id: string): Promise<Address> {
    const address = this.addresses.find((mapAddress) => mapAddress.id === id);
    if (address) return address;
    return null;
  }

  async list(companyId: string): Promise<Address[]> {
    const filteredAddresses = this.addresses.filter(
      (mapAddress) => mapAddress.companyId === companyId,
    );
    return filteredAddresses;
  }

  async delete(id: string): Promise<void> {
    const addressIndex = this.addresses.findIndex(
      (mapAddress) => mapAddress.id === id,
    );
    this.addresses.splice(addressIndex, 1);
  }

  async update(updatedAddress: Address): Promise<void> {
    const addressIndex = this.addresses.findIndex(
      (mapAddress) => mapAddress.id === updatedAddress.id,
    );
    this.addresses[addressIndex] = updatedAddress;
  }
}
