const express = require("express");

const app = express();
app.use(express.json());
app.use(express.static('public'));

const userRouter = express.Router();
app.use("/api/user", userRouter);

const authRouter = express.Router();
app.use('/api/auth/', authRouter);


function getUser(request, response) {
    response.status(200).send(user);
}
function createUser(request, response) {
    user = request.body;
    response.status(200).send("User Created and added successfully");
}
function updateUser(request, response) {
    let userObj = request.body;
    for(let key in userObj){
        user[key] = userObj[key];
    }
    response.status(200).send(user);
}
function deleteUser(request, response){
    user ={};
    response.status(200).send(user);
}
function getUserById(request, response) {
    let id = request.params.id;
    console.log(id);
    response.status(200).send("ID captured");
}
// this one is considered to be without database.
let user = [
    {
        "email": "abc@gmail.com",
        "username": "Hemant",
        "password": "123"
    },
    {
        "email": "lucifer@gmail.com",
        "username": "Lucifer",
        "password": "789"
    },
    {
        "email": "Tony@gmail.com",
        "username": "Tony",
        "password": "786"
    }
];
function signUpRequest(request, response) {
    // email, password, username
    let userObj = request.body;
    // push it into the database or array 
    user.push(userObj);
    // send the response 
    response.status(200).json({
        message: "User Created!",
        userCreated: request.body,
        userArray: user
    })
}
function loginRequest(request, response){
    let userObj = request.body;
    for(let i=0; i<user.length; i++){
        if(userObj.email == user[i].email && userObj.password == user[i].password){
            let userDetails = user[i];
            response.status(200).json({
                message: "Login Success!",
                Login_User: "Welcome " + userDetails.username,
            })
        }   
    }
    response.status(400).json({
        message: "Email or Password Invalid!",
    })
}
function forgetPasswordRequest(request, response) {}
function resetPasswordRequest(request, response) {}
function userCreatedAt(request, response, next) {
    // set the time when user created the application
    request.body.createdAt = new Date().toISOString();
    next(); // act as a middleware function
}

userRouter.route('/')
    .get(getUser)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter.route('/:id')
    .get(getUserById)

authRouter.route('/signup')
    .post(userCreatedAt, signUpRequest)

authRouter.route('/login')
    .post(loginRequest)

authRouter.route('/forgetpassword')
    .post(forgetPasswordRequest) 

authRouter.route('/resetpassword')
    .post(resetPasswordRequest)


app.listen(8080, function(request, response){
    console.log("Server Connected. Listening on 8080 port.");
})