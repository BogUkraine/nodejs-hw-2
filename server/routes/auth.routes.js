const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = Router();
const {check, validationResult} = require('express-validator'); 
const jwt = require('jsonwebtoken');
const config = require('config');

router.post(
    '/register', 
    [
        check('login', 'login must contain more than 3 symbols').isLength({min: 3}),
        check('password', 'Password must contain more than 6 symbols').isLength({min: 6})
        ], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data in registration fields'
            })
        }

        const {login, password} = req.body;

        const candidate = await User.findOne({ login })
        if(candidate) {
            return res.status(400).json('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password,12 );
        const user = new User({ login, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User was created" });
    }
    catch (error) {
        res.status(500).json({message: 'User wasn\'t created'});
    }
})

router.post('/login', [
    check('login', 'login must contain more than 3 symbols').isLength({min: 3}),
    check('password', 'Password must contain more than 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data in login fields'
            })
        }

        const {login, password} = req.body;

        const user = await User.findOne({ login });
        if(!user) {
            return res.status(400).json({ message: "This user doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h'}
        )    

        res.status(201).json({ token, userId: user.id });
    }
    catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
})

module.exports = router;
