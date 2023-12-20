const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose")
const seat = require('./bca_seatarrange')
const SemModel = require('./Models/SemModel');
const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json());
const mongoURI = 'mongodb+srv://Prince:prince%402563@prince25.ublcpff.mongodb.net/bcamitra/';

mongoose.connect(mongoURI,  (err) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
    } else {
      console.log('Connected to MongoDB');
    }
  });
  

module.exports = mongoose.model("sem",SemModel);
// ;Route to get all posts
app.get("/",(req,res)=>{
    res.send("Hello world")
});
app.get('/api/sem', async (req, res) => {
    try {
      const sem = await SemModel.findOne({});
      res.json(sem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Route to get one post
app.get("/api/getsemfromid/:id", (req,res)=>{

const id = req.params.id;
 db.query("SELECT (name) FROM sem WHERE id = ?", id, 
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });   });

app.get('/api/subject',(req,res)=>{
    db.query("SELECT * FROM subject",(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        res.send(result)
    });
});

// Route for creating the post
app.post('/api/subject/create', (req,res)=> {
data=  req.body.data;
data.map((i)=>{
    const cc =i.s_cc;
    const name = i.s_name;
    const id = i.s_semid;
    
db.query("INSERT INTO subject(`s_cc`,`s_name`,`s_semid`) VALUES (?,?,?)",[cc,name,id], (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
 
    console.log(result)
 });
})

  });


// seatno fetch
app.get('/api/seatno/sem3',(req,res)=>{
    // const id = req.params.id;
    db.query("SELECT * from bcasem3",(err,result)=>{
        if(err)
            {
                console.log(err)
            }
            res.send(result)
    })
})
app.get('/api/seatno/sem3/seatno/:seatno',(req,res)=>{
    
    const id = req.params.seatno;
    console.log(JSON.stringify(id));
    db.query("SELECT * from bcasem3 WHERE SEATNO = ?",id,(err,result)=>{
        if(err)
            {
                res.send(err)
            }
            res.send(result)
    })
})
app.get('/api/seatno/sem3/name/:name',(req,res)=>{
    var id = req.params.name;
    var code = req.query.colcode;
    console.log(id);
    console.log(code);
    id='%'+id+'%';
    if(code=='ALL')
    {
        db.query("SELECT * from bcasem3 WHERE NAME LIKE ? ",[id],(err,result)=>{
            if(err)
                {
                    console.log(err)
                }
                
                res.send(result)
        })    
    }
    else{
    db.query("SELECT * from bcasem3 WHERE NAME LIKE ? AND COLLEGE = ?",[id,code],(err,result)=>{
        if(err)
            {
                console.log(err)
            }
            
            res.send(result)
    })
    }
})

// listining PORT
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})    