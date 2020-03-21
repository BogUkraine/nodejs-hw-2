const {Router} = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth.middleware');
const router = Router();
const config = require('config');

router.post('/create', auth, async (req, res) => {
    try {
        const {title, description} = req.body;

        const todo = new Todo({title, description, owner: req.user.userId});
        await todo.save();
        res.status(201).json({ message: "Todo was created" });
    }
    catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ owner: req.user.userId });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.delete('/delete', auth, async (req, res) => {
    try {
        await Todo.findOneAndRemove({_id: req.body._id}, (error) => {
            if(error) {
                res.json({ massage: "Failed to delete todo" });
            }
            else {
                res.json({ massage: "Todo was successfully deleted" });
            }
        });

        res.status(201).json({ message: "Todo was deleted" });
    }
    catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.put('/check' , auth, async (req, res) => {
    try {
        await Todo.findOneAndUpdate({_id: req.body._id}, {isDone: req.body.isDone},(error) => {
            if(error) {
                res.json({ massage: "Failed to update todo" });
            }
            else {
                res.json({ massage: "Todo was successfully updated" });
            }
        });

        //res.status(201).json({message: "Todo was successfully updated" });
    }
    catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
})

module.exports = router;