const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const bcrypt = require("bcrypt");
const router = express.Router();

router.use(express.json());

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });

    const db_token = jwt.sign({ userId: user._id }, "secret");

    res.status(200).json({ msg: "User successfully created", token: db_token });

})


router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Email you entered is incorrect/invalid" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ msg: "Invalid Password" });

    const db_token = jwt.sign({ userId: user._id }, "secret");

    return res.status(200).json({ msg: "User logged in successfully", token: db_token });
})

module.exports = router;