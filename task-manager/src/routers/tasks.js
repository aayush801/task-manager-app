const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    task.save().then(() => {
        res.send(task)
    }).catch((error) => {
        res.send(error)
    })
});


router.get('/tasks',auth, async (req, res) => {
    try{
        const task = await Task.find({owner : req.user._id});
        res.send(task);
    }
    catch(e){
        res.send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id, owner: req.user._id});

        if(!task){
            res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.send(e)
    }

})


router.patch('/tasks/:id',auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const update = req.body;
        const task = await Task.findByIdAndUpdate({_id, owner :req.user._id }, update, {new: true, runValidators: true});
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);
    } catch (e) {
        res.send(e);
    }

})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findByIdAndDelete({_id, owner: req.user._id});
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);
    } catch (e) {
        res.send(e);
    }

})

module.exports = router;
