import { stringCapitalize } from '../utils/string-capitalize';
import { User } from '@domain/user/user.entity';

export class UserMapper {
  static toView(user: User) {
    return {
      id: user.id,
      name: stringCapitalize(user.name),
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
