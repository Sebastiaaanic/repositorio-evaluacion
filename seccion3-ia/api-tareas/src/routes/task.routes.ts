import { Router } from 'express';
import { TaskController } from '../controllers/task.controller.js';

const router = Router();

router.post('/ManageTask', TaskController.ManageTask);
router.get('/GetTasks', TaskController.CustomTaskFind);
router.patch('/PatchTasks/:id/:patchPriority', TaskController.TaskPatch);
router.get('/resumen', TaskController.taskReport);

export default router;