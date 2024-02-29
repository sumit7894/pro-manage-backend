const express = require('express');
const {PORT} = require('./src/config/serverConfig')
const connect = require('./src/config/database');
const authRouter = require('./src/routes/authRoute')
const cors = require('cors');
const userRouter = require('./src/routes/userRoute');
const taskRouter = require('./src/routes/taskRoute');
const app = express();
app.use(express.json());
const corsOptions = {
    credentials: true,
    origin: "*",
  };
app.use(cors(corsOptions));
app.use('/',authRouter);
app.use('/user',userRouter);
app.use('/',taskRouter);
app.listen(PORT,()=>{
    console.log(`Server started at the port ${PORT}`)
    connect();
    console.log("Yup!! Server is runnning");
})
