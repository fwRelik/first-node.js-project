const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const router = require('./routes/router')
const path = require('path')

const { mongodbUrl } = require('./config/config')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))

// app.use(express.static(`${__dirname}/public`))
app.use(express.static(path.join(__dirname, 'public')))

app.use(router)

async function start() {
    try {
        await mongoose.connect(mongodbUrl, {})

        app.listen(PORT, () => {
            console.log(`Server has been started... PORT: ${PORT}`)
        })

    } catch (e) {
        console.log(e)
    }
}

start()
