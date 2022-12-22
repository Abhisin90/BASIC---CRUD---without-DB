const express = require('express')
const app = express()
const path = require('path')
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override')
 
app.use(express.urlencoded({ extended: true }))   // to parse form encoded details in body
app.use(express.json())  // to parse json data in body())
app.use(methodOverride('_method'))         // to override http methods to let use Put and Delete methods
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

let comments = [
    {   
        id:uuid(),
        username:'adj',
        comment:'i love doing crafts and illustration'
    },
    {   
        id:uuid(),
        username:'shiv',
        comment:'I got a girl bestie'
    },
    {   
        id:uuid(),
        username:'souvenger',
        comment:'ML guy you go to is me!!!'
    },
    {   
        id:uuid(),
        username:'luvi',
        comment:'mai ek pyar sa bcha hu'
    }
]

app.get('/comments',(req,res) => {
    res.render('comments/index',{comments})
}) 

app.get('/comments/new' ,(req,res) => {
    res.render('comments/new')
})

app.get('/comments/:id',(req,res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show',{comment})
})

app.get('/comments/:id/edit',(req,res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit',{comment})
})

app.patch('/comments/:id',(req,res) => {
    const {id} = req.params
    const newCommentText = req.body.comment
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText
    res.redirect('/comments')
})

app.delete('/comments/:id',(req,res) => {
    const {id} = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})

app.post('/comments',(req,res) => {
    const {username,comment} = req.body
    comments.push({id:uuid(),username,comment,})
    res.redirect('/comments')
})

app.listen(3000,() => {
    console.log("Listening on port 3000!!!")
})