import { UserReqDto } from './user.req.dto.js';
import { UserModel }  from '../../models/user.model.js';

export const toUserModel = (dto: UserReqDto): UserModel => ({
  id:              crypto.randomUUID().replace(/-/g, ''),
  nameUser:        dto.name,
  lastNameUser: dto.lastName,
  age:              dto.age,
  status:           dto.status
});