const express = require('express')
const router = express.Router();
const Client = require('../models/clientModel')

router.post('/',async (req,res)=>{
    const {name , email} = req.body;
    try {
        const clientData = await Client.create({
          name,
          email,
        });
        res.status(201).json(clientData);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

});

router.get("/", async (req, res) => {
    try {
      const allClients = await Client.find();
      res.status(200).json(allClients);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;