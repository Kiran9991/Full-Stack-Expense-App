const express = require('express');

const expenseControllers = require('../controller/expenseController')

const router = express.Router();

router.post('/add-expense', expenseControllers.addExpense);

router.get('/get-expenses', expenseControllers.getExpenses);

router.delete('/delete-expense/:id', expenseControllers.deleteExpense);

module.exports = router;