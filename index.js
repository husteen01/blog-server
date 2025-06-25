require("dotenv").config()
const express = require("express") 
const app = express();
const PORT = process.env.PORT || 2000
const mongoose = require("mongoose")
const authRouter = require("./routes/authRouter")
const auth = require("./middleware/authentication.js")
const blogRouter = require("./routes/blogRouter.js")
const notfound = require("./utils/notfound.js")


//Middlewares
app.use(express.json())
app.use("/api/v1", authRouter)
// app.get("/test", auth, (req, res)=>{
//     res.send("passed authentication")

// })
// app.use("/api/v1/blog", auth, blogRouter) //auth middleware is used to protect the blog route from being accessed by unauthorized users
// app.get ("/", (req, res)=>{
//     res.status(200).json({success: true, message: "server is live"})
// });
// app.use(notfound) //notfound middleware is used to handle 404 errors when the route



const start = async () => {
   try {
    //using our env: it is connected to the liveserver to require it using "process.env.?"
     await mongoose.connect(process.env.MONGODB_URI); //".connect()" is a method to connect mongoose to our database
     app.listen(PORT, ()=>{
     console.log(`server is running on port ${PORT} and database connected`);
     });
   } catch (error) {
     console.log(error);
    }
};
start()




