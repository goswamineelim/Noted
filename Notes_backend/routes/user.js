const { Router } = require('express');
const User = require('../models/user')
const router = Router();

router.get('/signin', (req, res) => {
    return res.render("signin")
})
router.get('/signup', (req, res) => {
    return res.render("signup");
})
router.post('/signup', async (req, res) => {
    const { fullName, password, email } = req.body;
    try {
        await User.create({
            fullName,
            email,
            password
        });
    }
    catch (err) {
        console.error(err)
        return res.json({
            sucess: false,
            message: "Email already exists or incorrect details",
        })
    }
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        res.cookie('token', token)
        return res.json({
            sucess: true,
            message: "success",
            token: token
        })
    } 
    catch (error) {
        return res.json({
            'sucess': false,
            message: "Incorrect Email or Password",
        });
    }

})

router.post('/signin', async (req, res) => {
    const { password, email } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        res.cookie('token', token)
        return res.json({
            sucess: true,
            email:email,
            message: "success",
            token: token
        })
    } catch (error) {
        return res.json({
            'sucess': false,
            message: "Incorrect Email or Password",
        });
    }
})


router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/');
})

module.exports = router;
