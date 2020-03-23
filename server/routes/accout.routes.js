const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');

router.delete('/delete', auth, async (req, res) => {
    try {
        await User.remove({_id: req.user.userId});
        res.status(201).json({message: 'User was successfully deleted'});
    }
    catch (error) {
        res.status(500).json({message: 'User wasn\'t deleted'});
    }
});

module.exports = router;