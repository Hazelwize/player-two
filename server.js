const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')    
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')
const gamesRoutes = require('./routes/games')
const userRoutes = require('./routes/user')
require('dotenv').config({path: './config/.env'})
const cors = require('cors')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//Passport config
require('./config/passport')(passport)

//Connect to DB
connectDB()

//General Middleware
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

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
app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/games', gamesRoutes)





app.listen(process.env.PORT,() => {
    console.log(`Server is running!`)
})