import Task from "../models/Task.model.js";

export const createTask = async (req, res) => {
    const { title, description, category } = req.body;
    try {
        const newTask = new Task({ title, description, category });
        const savedTask = await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: savedTask });
    } catch (error) {
        res.status(500).json({ message: "Failed to create task", error: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Tasks fetched successfully", tasks });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
    }
};
 
export const updateTask = async (req, res) => {
    const id = req.params.id;
    const { title, description, category, isDone } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, category, isDone },
            { new: true, runValidators: true }
        );
        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Failed to update task", error: error.message });
    }
};

export const patchTaskIsDone = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        task.isDone = !task.isDone;
        const updatedTask = await task.save();
        res.status(200).json({ message: "Task status toggled successfully", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Failed to toggle task status", error: error.message });
    }
};
export const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTask = await Task.findByIdAndDelete(id); 
        res.status(200).json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete task", error: error.message });
    }
};