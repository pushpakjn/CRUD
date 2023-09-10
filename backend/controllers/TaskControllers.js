const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (req, res) => {
    const tasks = await TaskModel.find();
    res.send(tasks);
    // res.send("In taskModel");
}
module.exports.saveTask = (req,res) => {
    const {task} = req.body;
    TaskModel.create({task})
    .then((data) => {
    console.log("saved successfully");
    res.status(201).send(data); 
    })
    .catch((err) => {
    console.log(err);
    res.status(500).send({error: err,msg: "Error while saving data"});
    })  
}

module.exports.updateTask = (req,res) => {
    const {id} = req.params;
    const {task} = req.body;
    TaskModel.findByIdAndUpdate(id,{task})
    .then(() => res.send({msg: "Updated successfully"}))
    .catch((err) => {
    console.log(err);
    res.status(500).send({error: err,msg: "Error while updating data"});
    })
}

module.exports.deleteTask = (req,res) => {
    const {id} = req.params;
    TaskModel.findByIdAndDelete(id)
    .then(() => res.send({msg: "Deleted successfully"}))
    .catch((err) => {
    console.log(err);
    res.status(500).send({error: err,msg: "Error while deleting data"});
    })
}