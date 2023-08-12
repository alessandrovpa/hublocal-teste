import { Company } from '../company/company.entity';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

interface AddressProps {
  name: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  companyId: string;
  company?: Company;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AddressConstructor {
  id?: string;
  name: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  companyId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Address {
  private _id: string;

  private props: AddressProps;

  constructor(props: AddressConstructor) {
    this._id = props.id ? props.id : randomUUID();
    const createdAt = props.createdAt ? props.createdAt : new Date();
    const updatedAt = props.updatedAt ? props.updatedAt : new Date();
    this.props = {
      createdAt,
      updatedAt,
      ...props,
      name: props.name.replace(/\s+/g, ' ').trim(),
      number: props.name.replace(/\s+/g, ' ').trim(),
      neighborhood: props.neighborhood.replace(/\s+/g, ' ').trim(),
      city: props.city.replace(/\s+/g, ' ').trim(),
      state: props.state.replace(/\s+/g, '').trim(),
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
  public get cep(): string {
    return this.props.cep;
  }
  public set cep(cep: string) {
    this.props.cep = cep;
    this.props.updatedAt = new Date();
  }

  @ApiProperty()
  public get street(): string {
    return this.props.street;
  }
  public set street(street: string) {
    this.props.street = street.replace(/\s+/g, ' ').trim();
    this.props.updatedAt = new Date();
  }

  @ApiProperty()
  public get number(): string {
    return this.props.number;
  }
  public set number(number: string) {
    this.props.number = number.replace(/\s+/g, ' ').trim();
    this.props.updatedAt = new Date();
  }

  @ApiProperty()
  public get neighborhood(): string {
    return this.props.neighborhood;
  }
  public set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood.replace(/\s+/g, ' ').trim();
    this.props.updatedAt = new Date();
  }

  @ApiProperty()
  public get city(): string {
    return this.props.city;
  }
  public set city(city: string) {
    this.props.city = city.replace(/\s+/g, ' ').trim();
    this.props.updatedAt = new Date();
  }

  @ApiProperty()
  public get state(): string {
    return this.props.state;
  }
  public set state(state: string) {
    this.props.state = state.replace(/\s+/g, '').trim();
    this.props.updatedAt = new Date();
  }

  public get companyId(): string {
    return this.props.companyId;
  }

  public get company(): Company {
    return this.props.company;
  }
  public set company(company: Company) {
    this.props.company = company;
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
