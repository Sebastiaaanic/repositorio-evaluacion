import { connectTDB, sql } from "../config/Db.js";
import { TaskCreateModel,TaskFiltersModel,TaskPatchModel,TaskReportModel } from "../models/task.model.js";

export const TaskRepository = {

  ManageTask: async (model: TaskCreateModel): Promise<Record<string, unknown>[]> => {
    const pool = await connectTDB();

    const result = await pool.request()
      .input("ID_OPERATION_TYPE", sql.NVarChar, "CREATE_TASK")
      .input("TASK_ID",           sql.NVarChar, model.id)
      .input("NAME_TASK",         sql.NVarChar, model.nameTask)
      .input("DESCRIPTION_TASK",  sql.NVarChar, model.descriptionTask)
      .input("PRIORITY",          sql.NVarChar, model.priorityTask)
      .input("ID_RESPONSABLE",    sql.NVarChar, model.idResponsableTask)
      .input("DATE_LIMIT",        sql.NVarChar, model.dateLimitTask)
      .execute("SP_MANAGE_TASK");

    return result.recordset;
  },

  CustomTaskFind: async (model: TaskFiltersModel): Promise<Record<string, unknown>[]> => {
    const pool = await connectTDB();

    const result = await pool.request()
      .input("ID_OPERATION_TYPE", sql.NVarChar, "CUSTOM_FIND")
      .input("RESPONSABLE",       sql.NVarChar, model.responsable)
      .input("STATUS",            sql.NVarChar, model.statusTask)
      .input("DESDE",             sql.NVarChar, model.desde)
      .input("HASTA",             sql.NVarChar, model.hasta)
      .execute("SP_MANAGE_CUSTOMFIND");

    return result.recordset;
  },

  PatchTask: async (model: TaskPatchModel): Promise<Record<string, unknown>[]> => {
    const pool = await connectTDB();

    const result = await pool.request()
      .input("ID_OPERATION_TYPE", sql.NVarChar, "PATCH_TASK")
      .input("TASK_ID",           sql.NVarChar, model.idTask)
      .input("PATCH_PRIORITY",    sql.NVarChar, model.patchPriority)
      .execute("SP_MANAGE_TASK");

    return result.recordset;
  },

    reportTask: async (model: TaskReportModel): Promise<Record<string, unknown>[]> => {
    const pool = await connectTDB();

    const result = await pool.request()
      .input("ID_OPERATION_TYPE", sql.NVarChar, "REPORT_TASK")
      .input("ID_RESPONSABLE",           sql.NVarChar, model.responsable)
      .execute("SP_MANAGE_TASK");

    return result.recordset;
  }

};