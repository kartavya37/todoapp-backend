import express from 'express';
import { createTask, getTasks, updateTask, patchTaskIsDone, deleteTask} from '../controllers/Task.controller.js';

const router = express.Router();

router.post('/create', createTask);
router.get('/get', getTasks);
router.put('/update/:id', updateTask);
router.patch('/update/:id', patchTaskIsDone);
router.delete('/delete/:id', deleteTask);

export default router;