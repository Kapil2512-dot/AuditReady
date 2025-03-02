const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/userModel')


//Register
router.post('/signup', async (req,res) => {
    try{
    const {name,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//login
router.post('/login',async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
    
        if (!user) return res.status(400).json({ error: "User not found" });
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
    
        res.status(200).json({ message: "Login successful", user });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

})

module.exports = router;
