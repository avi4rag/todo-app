const Todo = require("../models/Todo");


exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const todo = await Todo.create({ text, user: req.userId });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (req.body.text !== undefined) todo.text = req.body.text;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
