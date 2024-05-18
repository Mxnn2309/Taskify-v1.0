const mongoose = require('mongoose');

// Schema
const Tasks = require('../models/TaskModel.js');

// GET all tasks
const getTasks = async (req, res) => {
    const user_id = req.user._id;
    const tasks = await Tasks.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
};

// GET a single task
const getTask = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such task!' });
    }
    const task = await Tasks.findById(id);
    if (!task) {
        return res.status(404).json({ error: 'No such task!' });
    }
    res.status(200).json(task);
};

// POST a new task
const createTask = async (req, res) => {
    const { title, desc } = req.body;
    const user_id = req.user._id;

    let emptyFields = [];
    if (!title) {
        emptyFields.push('title');
    }
    if (!desc) {
        emptyFields.push('desc');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    // Adding Document to Database
    try {
        const task = await Tasks.create({ title, desc, user_id });
        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE a single task
const deleteTask = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such task!' });
    }
    const task = await Tasks.findOneAndDelete({ _id: id });
    if (!task) {
        return res.status(404).json({ error: 'No such task!' });
    }
    res.status(200).json(task);
};

// UPDATE a single task
const updateTask = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such task!' });
    }

    const task = await Tasks.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
        return res.status(404).json({ error: 'No such task!' });
    }
    res.status(200).json(task);
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
}