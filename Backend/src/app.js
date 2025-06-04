import express from "express"
import cors from "cors"

const app = express()

app.use(express.json());
app.use(cors())

//import routes

import farmerRouter from './routes/farmer.routes.js'
import buyerRouter from './routes/buyer.routes.js'
import userRouter from './routes/user.routes.js'

//declare routes

app.use("/user", userRouter)
app.use("/fdashboard", farmerRouter)
app.use("/bdashboard", buyerRouter)


export { app }