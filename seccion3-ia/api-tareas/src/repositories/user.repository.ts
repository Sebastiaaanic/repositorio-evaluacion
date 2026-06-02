import { connectTDB, sql } from "../config/Db.js";
import { UserModel } from "../models/user.model.js";

export const UserRepository = {
  createUserSP: async (
    model: UserModel,
  ): Promise<Record<string, unknown>[]> => {
    const pool = await connectTDB();

    const result = await pool
      .request()
      .input("ID_OPERATION_TYPE", sql.NVarChar, "CREATE_USER")
      .input("USER_ID", sql.NVarChar, model.id)
      .input("NAME_USER", sql.NVarChar, model.nameUser)
      .input("LAST_NAME_USER", sql.NVarChar, model.lastNameUser)
      .input("AGE", sql.Int, model.age)
      .input("STATUS", sql.NVarChar, model.status)
      .execute("SP_MANAGE_USER");

    return result.recordset;
  },
};
