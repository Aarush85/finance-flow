const { authMiddleware } = require("../middleware");
const express = require("express");
const mongoose = require("mongoose");
const { Expense } = require("../db");
const router = express.Router();

router.use(express.json());

router.get('/getAll', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const ExpenseObj = await Expense.find({ userId }).sort({date: -1});

    if (!ExpenseObj) return res.status(400).json({ msg: "No Expenses yet" });

    res.json({ ExpenseObj });
})

router.get('/get', authMiddleware, async (req, res) => {
    const ExpenseId = req.query.ExpenseId;
    const userId = req.userId;

    const expense = await Expense.findOne({_id: ExpenseId, userId});
    if(!expense) res.status(400).json({msg: "Invalid ExpenseId"});

    res.json({expense});
})

router.get('/filter', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const { category, startDate, endDate, sortBy, order } = req.query;

    // const filter = await Expense.findOne({userId});
    const filter = { userId };

    if (category) filter.category = category;

    if (startDate && endDate) {
        filter.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }

    // const sortOptions = {};
    // if(sortBy) {
    //     sortOptions[sortBy] = order === 'desc' ? -1: 1;
    // }

    //   console.log("Filter:", filter);


    const expenses = await Expense.find(filter);

    res.json({ expenses });

})

router.post('/add', authMiddleware, async (req, res) => {
    const { title, category, date, amount } = req.body;
    const userId = req.userId;

    // const UserExpenses = await Expense.findOne({userId});
    // const newExpense = {title, category, date, amount};

    // if(!UserExpenses) {
    //     await Expense.create({userId, expenses: [newExpense]})
    // }
    // else{
    //     UserExpenses.expenses.push(newExpense);
    //     await UserExpenses.save();
    // }

    await Expense.create({ userId, title, category, date, amount });


    res.status(200).json({ msg: "New Expense added successfully" });
})

router.put('/update', authMiddleware, async (req, res) => {
    const ExpenseId = req.query.ExpenseId;
    const userId = req.userId;

    const { title, category, date, amount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(ExpenseId)) {
        return res.status(400).json({ msg: "Invalid ID" });
    }

    const objectId = new mongoose.Types.ObjectId(ExpenseId);

    const expense = await Expense.findOne({ userId, _id: objectId });
    // const UserExpense = await Expense.find({userId});

    // const expense = await UserExpense.findOne(n => n._id.equals(ExpenseId));

    if (!expense) res.status(404).json({ msg: "Expense not found" });

    expense.title = title;
    expense.category = category;
    expense.date = date;
    expense.amount = amount;

    // await UserExpense.save();
    await expense.save();

    res.json({ msg: "Expense updated successfully" });

})

router.delete('/delete', authMiddleware, async (req, res) => {
    const ExpenseId = req.query.ExpenseId;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(ExpenseId)) {
        return res.status(400).json({ msg: "Invalid ID" });
    }

    const objectId = new mongoose.Types.ObjectId(ExpenseId);

    const deleted = await Expense.deleteOne({ _id: ExpenseId, userId});

    if(deleted.deletedCount === 0){
        return res.status(400).json({msg: "Expense not found or not yours"});
    }

    
    // const UserExpense = await Expense.find({ userId });

    // UserExpense.expenses.pull({ _id: ExpenseId });
    // await UserExpense.save();

    return res.json({ msg: "Expense deleted successfully" });
})

module.exports = router;