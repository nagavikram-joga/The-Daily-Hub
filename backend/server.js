import dotenv from "dotenv"
import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import noteroutes from './routes/notes.js'
import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js"
import transactionRoutes from "./routes/Transactions.js";
import forgotPasswordRouter from "./routes/forgotPassword.js"

//express app
const app = express()
mongoose.set('strictQuery', true);

const allowedOrigins = [
    "http://localhost:3000",
    "http://thedailyhub.com"
    // add more origins as needed
  ];

//middleware
app.use(express.json())
app.use(cors())
app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/notes', noteroutes)
app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)
app.use("/api/v1", transactionRoutes);
app.use("/api/forgotPassword", forgotPasswordRouter)

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to DB & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })



