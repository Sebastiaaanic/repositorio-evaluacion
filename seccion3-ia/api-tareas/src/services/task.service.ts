import {
  toTaskCreateModel,
  toTaskFiltersModel,
  toTaskPatchModel,
} from "../dtos/Task/task.profile.js";
import { TaskReqDto } from "../dtos/Task/task.req.dto.js";
import { TaskResDto } from "../dtos/Task/task.res.dto.js";
import {
  TaskFiltersModel,
  TaskPatchModel,
  TaskReportModel,
} from "../models/task.model.js";
import { TaskRepository } from "../repositories/task.repository.js";

export const taskService = {
  createTask: async (dto: TaskReqDto): Promise<TaskResDto> => {
    const model = toTaskCreateModel(dto);
    const result = await TaskRepository.ManageTask(model);
    const row = result[0];

    return {
      responseCode: row["responseCode"] as string,
      reasonText: row["reasonText"] as string,
      TaskCreate: {
        id: model.id,
        title: model.nameTask,
        limitDate: model.dateLimitTask,
        status: model.priorityTask,
      },
      TaskList: null,
    };
  },

  getCustomTask: async (model: TaskFiltersModel): Promise<TaskResDto> => {
    const result = await TaskRepository.CustomTaskFind(model);

    if (result.length === 0) {
      return {
        responseCode: "01",
        reasonText: "TASK NOT FOUND",
        TaskCreate: null,
        TaskList: [],
      };
    }

    return {
      responseCode: "00",
      reasonText: "FIND SUCCESS",
      TaskCreate: null,
      TaskList: result.map((row) => ({
        id: row["idTask"] as string,
        nameTask: row["nameTask"] as string,
        description: row["descriptionTask"] as string,
        priority: row["priorityTask"] as string,
        dateLimit: row["dateLimit"] as string,
      })),
    };
  },

  patchTask: async (model: TaskPatchModel): Promise<TaskResDto> => {
    const result = await TaskRepository.PatchTask(model);
    const row = result[0];

    return {
      responseCode: row["responseCode"] as string,
      reasonText: row["reasonText"] as string,
      TaskCreate: null,
      TaskList: null,
    };
  },

  reportTask: async (model: TaskReportModel): Promise<TaskResDto> => {
    const result = await TaskRepository.reportTask(model);
    if (result.length === 0) {
      return {
        responseCode: "01",
        reasonText: "TASK REPORT NOT FOUND",
        TaskCreate: null,
        TaskList: [],
      };
    }

    return {
      responseCode: "00",
      reasonText: "REPORT TASK SUCCESS",
      TaskCreate: null,
      TaskReport: {
        Responsable: result.map((row) => ({
          priorityTask: row["priorityTask"] as string,
          countTasks: row["countTask"] as number,
          promedioDias: row["promedio"] as number,
        })),
      },
    };
  },
};
