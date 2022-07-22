const express = require("express");

const app = express();  // server created
app.use(express.json());    // without this we cannot read post details which is already in json format

let user = {};

// CRUD Application

// 1. User Create
app.post("/user", function(request, response){
    user = request.body;
    console.log("Requested user:" , user);
    response.status(200).json("user added to server");
})

// 2. User read
app.get("/user", function(request, response) {
    response.status(200).send(user);
})

// 3. User update
app.patch('/user', function(request, response){
    let object = request.body;
    for (let key in object){
        user[key] = object[key];
    }
    response.status(200).json(user);
})

// 4. User Delete
app.delete('/user', function(request, response){
    user = {};
    response.status(200).json(user);
})


app.listen(8080, function(){
    console.log("Server Started. Listening on port 8080");
})