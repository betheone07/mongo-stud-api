const express = require("express");
const app = express();

const cors = require("cors");
const mongodb = require("mongodb");
const MongodbClient = mongodb.MongoClient;

const URL = "mongodb+srv://arnab:bunty123@chubb.qz9bm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DB = "Chubb_CRUD";






app.use(express.json())

app.use(cors())

//add student array
app.post("/student", async (req, res) => {
  console.log(req.body);
  try {
    let connection = await MongodbClient.connect(URL, {
      useUnifiedTopology: true
    });
    let db = connection.db(DB);
    let insertedStudent = await db.collection("students").insertOne(req.body);
    await connection.close();
    res.status(200).json(insertedStudent);
  } catch (error) {
    res.status(500).json(error)

  }
});


//add mentor array
app.post("/mentor", async (req, res) => {
  try {
    let connection = await MongodbClient.connect(URL, {
      useUnifiedTopology: true
    });
    let db = connection.db(DB);
    let insertedMentor = await db.collection("mentors").insertMany(req.body);
    await connection.close();
    res.status(200).json(insertedMentor);
  } catch (error) {
    res.status(500).json(error)

  }
});

//add mentees to mentors
app.put("/mentor/:id", async (req, res) => {
  try {
    console.log(req.body)
    let connection = await MongodbClient.connect(URL, {
      useUnifiedTopology: true
    });
    let db = connection.db(DB);
    let insertedMentor = await db.collection("mentors").updateOne({_id:mongodb.ObjectID(req.params.id)}, {
      $push: {
        mentees: req.body
      }
    })
    await connection.close();
    res.status(200).json(insertedMentor);
  } catch (error) {
    res.status(500).json(error)

  }
})

//assign mentor to a student
app.put("/student/:id", async (req, res) => {
  console.log(req.body);
  try {
    let connection = await MongodbClient.connect(URL, {
      useUnifiedTopology: true
    });
    let db = connection.db(DB);
    let insertedStudent = await db.collection("students").findOneAndUpdate({_id:mongodb.ObjectID(req.params.id)} , {
      $set: {
        mentor: req.body
      }
    })
    await connection.close();
    res.status(200).json(insertedStudent);
  } catch (error) {
    res.status(500).json(error)

  }
});




































// //to show the students
// app.get('/mentees' , (req,res) => {
//   res.json(student)
// })

// //to show all mentors
// app.get('/mentors' , (req,res) => {
//   res.json(mentors)
// })

// //to add students to particular mentor
// app.put('/mentors/:id' , (req,res) => {

//   let myid = req.params.id;

//     mentors[myid].mentees.push(req.body);
//     res.json(mentors);
// })


// //to assign mentor to student

// app.put('/mentees/:id1/mentor/:id2' , (req,res) => {

//     let studid = req.params.id1;
//     let mentid = req.params.id2;

//     student[studid].mentor = mentors[mentid].name;
//     res.json(student);
// })

// //to show all students for a particular mentor

// app.get('/mentors/show/:id' , (req,res) => {

//   let myid = req.params.id;
//   let findstudents = mentors[myid].mentees;

//   res.json(findstudents);
// })








app.listen(6565)