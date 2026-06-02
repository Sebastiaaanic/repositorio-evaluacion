import { toUserModel } from "../dtos/User/user.profile.js";
import { UserReqDto } from "../dtos/User/user.req.dto.js";
import { UserResDto } from "../dtos/User/user.res.dto.js";
import { UserRepository } from "../repositories/user.repository.js";

export const UserService = {
  createUser: async (dto: UserReqDto): Promise<UserResDto> => {
    const model = toUserModel(dto);
    const result = await UserRepository.createUserSP(model);
    const row = result[0];

    return {
      responseCode: row["responseCode"] as string,
      reasonText: row["reasonText"] as string,
      user: {
        id: model.id,
        nameUser: model.nameUser,
        status: model.status,
      },
    };
  },
};
