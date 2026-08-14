import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import DatabaseConnection from './Configs/Database.js'
import { clerkMiddleware } from '@clerk/express'
import {serve} from 'inngest/express'
import {inngest, functions} from './inngest/index.js'
const app =  express()
const Port = 3000;

await DatabaseConnection()
// Middleware

app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())
app.use('/api/inngest', serve({client: inngest, functions}))

// Routes

app.get('/', (req, res)=>{
    res.send('Server is Live')
})


app.listen(Port, ()=>{
    try{
console.log('Backend Server is Online at ', Port)
    }catch(error){
console.log('Error Encounterde at Backend Conncetion')
    }
})