const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const SemModel = require('./Models/SemModel');
const Sem = require('./Models/Sem');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb+srv://Prince:prince%402563@prince25.ublcpff.mongodb.net/bcamitra';

mongoose.connect(mongoURI);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/api/sem', async (req, res) => {
  try {
    const sem = await Sem.find({});
    res.json(sem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/seatno/sem3',async(req,res)=>{
  // const id = req.params.id;
  try {
    const sem = await SemModel.find({});
    res.json(sem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
app.get('/api/seatno/sem3/:seatno', async(req,res)=>{
  
  const id = req.params.seatno;
  console.log(JSON.stringify(id));
  try {
    const sem = await SemModel.find({SEATNO:id});
    res.json(sem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
app.get('/api/seatno/sem3/name/:name',async(req,res)=>{
  var id = req.params.name;
  var code = req.query.colcode;
  console.log(id);
  console.log(code);
  if(code=="ALL")
 {
    try {
      const sem = await SemModel.find({ NAME: { $regex: new RegExp(id, 'i') }});
      res.json(sem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

 }
  else{
    try {
      const sem = await SemModel.find({NAME: { $regex: new RegExp(id, 'i') },COLLEGE:code});
      res.json(sem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
})
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
