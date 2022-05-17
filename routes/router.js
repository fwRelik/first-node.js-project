const { Router } = require('express')
const list = require('../models/list')
const router = Router()

router.get('/', async (req, res) => {
    const tasks = await list.find({}).lean()

    res.render('index', {
        title: 'Todo List',
        isIndex: true,
        tasks
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Todo List',
        isCreate: true
    })
})

router.post('/create', async (req, res) => {
    const todo = new list({
        title: req.body.title
    })

    await todo.save()

    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    const task = await list.findById(req.body.id)

    task.completed = !!req.body.completed;

    await task.save()

    res.redirect('/')
})

router.use((req, res) => {
    res.status(404).type('text/html')
    res.render('404')
});

module.exports = router