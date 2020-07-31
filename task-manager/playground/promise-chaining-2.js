require('../src/db/mongoose')
const Task = require('../src/models/task');

// User.findByIdAndRemove('5f217122e2ca853020eef378').then((user) => {
//     console.log(user)
//     return User.countDocuments({})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// });

const deleteTaskAndCount = async (id) => {
    const removed = await Task.findByIdAndRemove(id);
    console.log(removed);
    const counter = await Task.countDocuments({completed : false });
    return counter;
}

deleteTaskAndCount('5f2173a48782553790f0b4ff').then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e)
});