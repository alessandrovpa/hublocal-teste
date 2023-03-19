import { stringCapitalize } from '@utils/string-capitalize';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: stringCapitalize(user.name),
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
