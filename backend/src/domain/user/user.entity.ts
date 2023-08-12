import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

interface UserProps {
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserConstructor {
  id?: string;
  email: string;
  name: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private _id: string;

  private props: UserProps;

  constructor(props: UserConstructor) {
    this._id = props.id ? props.id : randomUUID();
    const createdAt = props.createdAt ? props.createdAt : new Date();
    const updatedAt = props.updatedAt ? props.updatedAt : new Date();
    const isAdmin = props.isAdmin ? props.isAdmin : false;
    this.props = {
      createdAt,
      updatedAt,
      isAdmin,
      ...props,
      name: props.name.replace(/\s+/g, ' ').trim(),
      email: props.email.replace(/\s+/g, '').trim(),
    };
  }

  @ApiProperty()
  public get id(): string {
    return this._id;
  }

  @ApiProperty()
  public get email(): string {
    return this.props.email;
  }

  @ApiProperty()
  public get name(): string {
    return this.props.name;
  }
  public set name(name: string) {
    this.props.name = name.replace(/\s+/g, ' ').trim();
    this.props.updatedAt = new Date();
  }

  public get password(): string {
    return this.props.password;
  }
  public set password(password: string) {
    this.props.password = password;
    this.props.updatedAt = new Date();
  }

  @ApiProperty()
  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public get isAdmin(): boolean {
    return this.props.isAdmin;
  }

  public toggleUserAdmin() {
    this.props.isAdmin = !this.props.isAdmin;
    this.props.updatedAt = new Date();
  }
}
