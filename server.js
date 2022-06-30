const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')
const gamesRoutes = require('./routes/games')
require('dotenv').config({path: './config/.env'})

//Passport config
require('./config/passport')(passport)

//Connect to DB
connectDB()

//General Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
)

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Routes

app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/games', gamesRoutes)





app.listen(process.env.PORT,() => {
    console.log(`Server is running!`)
})