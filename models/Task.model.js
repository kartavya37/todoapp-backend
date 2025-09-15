import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        // userId: { 
        //     type: mongoose.Schema.Types.ObjectId, 
        //     ref: 'User', 
        //     required: true, 
        //     index: true 
        // },
        title: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            default: '' 
        },
        category: { 
            type: String, 
            default: 'Others', 
            index: true 
        },
        isDone: { 
            type: Boolean, 
            default: false 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    }
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;