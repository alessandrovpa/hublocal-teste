import { Address } from '../address/address.entity';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

interface CompanyProps {
  name: string;
  website: string;
  cnpj: string;
  userId: string;
  addresses?: Address[];
  addressesCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CompanyConstructor {
  id?: string;
  name: string;
  website: string;
  cnpj: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Company {
  private _id: string;

  private props: CompanyProps;

  constructor(props: CompanyConstructor) {
    this._id = props.id ? props.id : randomUUID();
    const createdAt = props.createdAt ? props.createdAt : new Date();
    const updatedAt = props.updatedAt ? props.updatedAt : new Date();
    this.props = {
      createdAt,
      updatedAt,
      ...props,
      name: props.name.replace(/\s+/g, ' ').trim(),
      website: props.website.replace(/\s+/g, '').trim(),
    };
  }

  @ApiProperty()
  public get id(): string {
    return this._id;
  }

  @ApiProperty()
  public get name(): string {
    return this.props.name;
  }
  public set name(name: string) {
    this.props.name = name.replace(/\s+/g, ' ').trim();
    this.props.updatedAt = new Date();
  }

  @ApiProperty()
  public get website(): string {
    return this.props.website;
  }
  public set website(website: string) {
    this.props.website = website.replace(/\s+/g, '').trim();
    this.props.updatedAt = new Date();
  }

  @ApiProperty()
  public get cnpj(): string {
    return this.props.cnpj;
  }
  public set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
    this.props.updatedAt = new Date();
  }

  @ApiProperty({
    isArray: true,
    type: Address,
  })
  public get addresses(): Address[] {
    return this.props.addresses;
  }
  public set addresses(addresses: Address[]) {
    this.props.addresses = addresses;
    this.props.updatedAt = new Date();
  }

  @ApiProperty({
    type: Number,
  })
  public get addressesCount(): number {
    return this.props.addressesCount;
  }
  public set addressesCount(addressesCount: number) {
    this.props.addressesCount = addressesCount;
    this.props.updatedAt = new Date();
  }

  public get userId(): string {
    return this.props.userId;
  }

  @ApiProperty()
  public get createdAt(): Date {
    return this.props.createdAt;
  }

  @ApiProperty()
  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
