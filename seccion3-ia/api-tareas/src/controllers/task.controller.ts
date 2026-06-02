import { Request, Response } from "express";
import { TaskReqDto } from "../dtos/Task/task.req.dto.js";
import { taskService } from "../services/task.service.js";
import { toTaskFiltersModel, toTaskPatchModel, toTaskReportModel } from "../dtos/Task/task.profile.js";

export const TaskController = {
  ManageTask: async (req: Request, res: Response): Promise<void> => {
    const dto: TaskReqDto = req.body;

    switch (dto.typeOperation) {
      case "A":
        const response = await taskService.createTask(dto);

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

  CustomTaskFind: async (req: Request, res: Response): Promise<void> => {
    const modelParams = toTaskFiltersModel(req.query);

    const response = await taskService.getCustomTask(modelParams);

    if (response.responseCode !== "00") {
      res.status(400).json(response);
      return;
    }

    res.status(200).json(response);
  },

  TaskPatch: async (req: Request, res: Response): Promise<void> => {
    const modelParams = toTaskPatchModel(req.params);

    const response = await taskService.patchTask(modelParams);

    if (response.responseCode !== "00") {
      res.status(400).json(response);
      return;
    }

    res.status(200).json(response);
  },

    taskReport: async (req: Request, res: Response): Promise<void> => {
    const modelParams = toTaskReportModel(req.query);

    const response = await taskService.reportTask(modelParams);

    if (response.responseCode !== "00") {
      res.status(400).json(response);
      return;
    }

    res.status(200).json(response);
  },


};
