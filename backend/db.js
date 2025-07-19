const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/FinanceTracker1");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    }
    ,
    email: {
        type: String,
        required: true
    }
    ,
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", UserSchema);
 

const ExpenseSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}) 

const Expense = mongoose.model("Expense", ExpenseSchema);

const IncomeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const Income = mongoose.model("Income", IncomeSchema);

module.exports = {User, Expense, Income};