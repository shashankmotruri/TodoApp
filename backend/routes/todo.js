const express = require("express");

const router = express.Router();
const {AddTodo,UpdateTodo,DeleteTodo,GetAllTodos,GetTodoById} = require('../controllers/todos')

router.post("/addTodo/:userid",AddTodo);
router.put("/updateTodo/:userid/:id",UpdateTodo);
router.delete("/deleteTodo/:userid/:id",DeleteTodo);

router.get("/getTodo/:userid/:id",GetTodoById);

router.get("/getAllTodos/:userid",GetAllTodos);

module.exports = router;

