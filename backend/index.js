const express = require("express");
const cors = require("cors");
const IncomeRouter = require("./routes/Income");
const UserRouter = require("./routes/User");
const ExpenseRouter = require("./routes/Expense");

const app = express();

app.use(cors());

app.use('/api/user', UserRouter);
app.use('/api/expense', ExpenseRouter);
app.use('/api/income', IncomeRouter);

app.listen(3000, (err) => {
    if(err) return console.log(err);

    console.log("App is running in port 3000");
})