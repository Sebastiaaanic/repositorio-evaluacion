import { Request, Response } from "express";
import { UserReqDto } from "../dtos/User/user.req.dto.js";
import { UserService } from "../services/user.service.js";

export const UserController = {
  ManageUser: async (req: Request, res: Response): Promise<void> => {
    const dto: UserReqDto = req.body;

    switch (dto.typeOperation) {
      case "A":
        const response = await UserService.createUser(dto);

        if (response.responseCode !== "00") {
          res.status(400).json(response);
          return;
        }

        res.status(200).json(response);

        break;
      case "D":
        // demostrar esalabilidad de codigo
        break;
      default:
        res.status(400).json({
          responseCode: "01",
          reasonText: "INVALID TYPE OPERATION",
        });

        return;
    }
  },
};
