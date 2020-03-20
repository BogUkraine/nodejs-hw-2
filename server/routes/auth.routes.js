const { Router } = require('express');
const router = Router();

router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body;
    }
    catch (error) {
        res.status(500).json({message: 'Sonething went wrong'});
    }
})

router.post('/login', async (req, res) => {

})

module.exports = router;
