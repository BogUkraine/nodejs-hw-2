const {Router} = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/create', auth, async (req, res) => {
    try {
        const {title, description} = req.body;

        const todo = new Todo({title, description, owner: req.user.userId});
        await todo.save();
        res.status(201).json({ message: 'Todo was created' });
    }
    catch (error) {
        res.status(500).json({message: 'Todo wasn\'t created'});
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ owner: req.user.userId });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({message: 'Something went wrong, can\'t show you todos'});
    }
});

router.delete('/delete', auth, async (req, res) => {
    try {
        await Todo.findOneAndRemove({_id: req.body._id, owner: req.user.userId});
        res.status(201).json({message: 'Todo was successfully deleted'});
    }
    catch (error) {
        res.status(500).json({message: 'Todo wasn\'t deleted'});
    }
});

router.put('/check' , auth, async (req, res) => {
    try {
        await Todo.findOneAndUpdate({_id: req.body._id, owner: req.user.userId}, {isDone: req.body.isDone});
        res.status(201).json({message: 'Todo was successfully updated'});
    }
    catch (error) {
        res.status(500).json({message: 'Todo wasn\'t updated'});
    }
});

router.put('/edit' , auth, async (req, res) => {
    try {
        await Todo.findOneAndUpdate({_id: req.body._id, owner: req.user.userId},
            {title: req.body.title, description: req.body.description});
        res.status(201).json({message: 'Todo was successfully updated'});
    }
    catch (error) {
        res.status(500).json({message: 'Todo wasn\'t updated'});
    }
})

module.exports = router;