const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth')

const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).send({
            user, token
        })
    } catch (e) {
        res.status(400).send(e)
    }
});

router.post('/users/login', async ({body}, res) => {
    try {
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        const userData  = await user.publicData();
        res.status(200).send({
         user: userData , token
        });
    } catch (e) {
        res.send(e);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save();
        res.status(200).send()
    } catch (e) {
      res.status(400)
    }
})

router.post('/users/logoutAll', auth, async (req,res) => {
    try{
        req.use.tokens = [];
        await req.user.save();
        res.status(200).save();
    }
    catch{
        res.status(400)
    }

})

router.get('/users/me', auth, async (req, res) => {
    const userData  = await req.user.publicData();
    res.send(userData);
});


router.patch('/users/me', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body);

        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });
        await req.user.save();

        const userData = await req.user.publicData();
        res.send(userData);
    } catch (e) {
        res.send(e);
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        const _id = req.user._id;
        const user = await User.findByIdAndDelete(_id);
        const userData = await user.publicData();
        res.send(userData);
        if (!userData) {
            return res.status(404).send()
        }
    } catch (e) {
        res.send(e);
    }
});


module.exports = router; 

