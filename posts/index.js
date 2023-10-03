import express from "express"
import { randomBytes } from "crypto"
import cors from "cors"
import axios from 'axios'
const app = express()




app.use(express.json())
app.use(cors())
const posts = {}


app.post("/posts/create", async (req, res) => {
    const id = randomBytes(4).toString("hex")
    const { title } = req.body

    posts[id] = {
        id, title
    }

    try {
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'postCreated',
            data: {
                id, title
            }
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }

app.post('/events', (req, res) => {
        console.log('received event :', req.body.type)
        res.send({})
    })

    res.status(201).send(posts[id])
})


app.listen(4000, () => {
    console.log("hello world")
    console.log("see u at 4000")
})
