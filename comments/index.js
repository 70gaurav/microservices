// import  express  from "express";
// import {randomBytes} from "crypto"
// import cors from "cors"
// const app = express()

// app.use(express.json())
// app.use(cors())
// const commentsByPostId = {}

// app.get("/posts/:id/comments" , (req , res) => {
// res.send(commentsByPostId[req.params.id] || []) 
// })

// app.post("/posts/:id/comments", (req, res) => {
//  const commentId = randomBytes(4).toString("hex")
//  const {content} = req.body

//  const comments = commentsByPostId[req.params.id] || []

//  comments.push({id:commentId , content})
//  commentsByPostId[req.params.id] = comments

//  res.status(201).send(comments)
// })

// app.listen(4001, () => {
//     console.log("see u at 4001")
// })

import express from 'express'
import {randomBytes} from 'crypto'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())


const commentsByPostId ={}

app.get('/posts/:id/comments' , (req , res) => {
    res.status(201).send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments' , (req , res) => {
    const id = req.params.id
    const {content} = req.body

    const commentId = randomBytes(4).toString('hex')

    const comments = commentsByPostId[id] || []

    comments.push({id:commentId , content})

    commentsByPostId[id] = comments
    res.status(201).send(comments)
})


app.listen(4001, () => {
    console.log('see u at 4000')
})

