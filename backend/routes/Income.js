const { authMiddleware } = require("../middleware");
const express = require("express");
const {Income} = require("../db");
const router = express.Router();

router.use(express.json());

router.get('/getAll', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const IncomeObj = await Income.find({userId}).sort({date: -1});

    if(!IncomeObj) return res.status(400).json({msg: "No Expenses yet"});

    res.status(200).json({IncomeObj});
})

router.get('/filter', authMiddleware, async(req, res) => {
    const userId = req.userId;
    const {category, startDate, endDate, sortBy, order} = req.query;

    // const filter = await Income.findOne({userId});
    const filter = {userId};

    if(category) filter.category = category;

    if(startDate && endDate) {
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


    const incomes = await Income.find(filter);

    res.json({incomes});

})

router.post('/add', authMiddleware, async (req, res) => {
    const {title, category, date, amount} = req.body;
    const userId = req.userId;

    // const UserExpenses = await Income.findOne({userId});
    // const newExpense = {title, category, date, amount};

    // if(!UserExpenses) {
    //     await Income.create({userId, incomes: [newExpense]})
    // }
    // else{
    //     UserExpenses.incomes.push(newExpense);
    //     await UserExpenses.save();
    // }

    await Income.create({userId, title, category, date, amount});


    res.status(200).json({msg: "New Income added successfully"});
})

router.put('/update', authMiddleware, async (req, res) => {
    const IncomeId = req.query.IncomeId;
    const userId = req.userId;

    const {title, category, date, amount} = req.body;

    if (!mongoose.Types.ObjectId.isValid(IncomeId)) {
            return res.status(400).json({ msg: "Invalid ID" });
        }
    
    const objectId = new mongoose.Types.ObjectId(IncomeId);

    const income = await Income.find({userId, _id: objectId});
    // const UserExpense = await Income.find({userId});

    // const income = await UserIncome.findOne(n => n._id.equals(IncomeId));

    if(!income) res.status(404).json({msg: "Income not found"});

    income.title = title;
    income.category = category;
    income.date = date;
    income.amount = amount;

    // await UserExpense.save();
    await income.save();

    res.json({msg: "Income updated successfully"});

}) 

router.delete('/delete', authMiddleware, async (req, res) => {
    const IncomeId = req.query.IncomeId;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(IncomeId)) {
            return res.status(400).json({ msg: "Invalid ID" });
        }
    
    const objectId = new mongoose.Types.ObjectId(IncomeId);

    const deleted = await Income.deleteOne({ _id: objectId, userId});

    if(deleted.deletedCount === 0){
        return res.status(400).json({msg: "Income not found or not yours"});
    }

    // const UserExpense = await Income.find({userId});

    // UserExpense.incomes.pull({_id: IncomeId});
    // await UserExpense.save();

    return res.json({msg: "Income deleted successfully"});
})

module.exports = router;