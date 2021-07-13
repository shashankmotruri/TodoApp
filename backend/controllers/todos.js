const TodoSchema = require('../models/TodoModel');


exports.AddTodo = function(req,res,next){

    var userId = req.params.userid;
    if( !req.body.name || !req.body.description){
        return res.status(401).send({ msg : "Enter All Fields" })
    }
    else{
        todo = new TodoSchema({user_id: userId, name: req.body.name, description: req.body.description });

        todo.save(function (err) {
            if (err) { 
              return res.status(500).send({msg:err.message});
            }
            else{
                return res.status(200).send({msg : "Todo Saved Successfully" , todo})
            }
        })
    }
}


exports.UpdateTodo = async function(req,res,next){
    var userId = req.params.userid;
    var todoId = req.params.id;

    if(!req.body.updatedName || !req.body.updatedDescription){
        return res.status(401).send({msg : "No Change Found !"});
    }
    else{
        try{
            let todo = await TodoSchema.findByIdAndUpdate
            (
                todoId,
                {
                name : req.body.updatedName,
                description : req.body.updatedDescription
                },
                {
                    new: true,
                    runValidators: true,
                }
            )
            if(todo) {
                res.status(200).json({msg : "Todo Updated Sycessfull",todo})
                }
        } 
        catch (err) {
        res.status(400).json({msg : "Failed to Update Todo"});
        }

    }

}


exports.DeleteTodo = function(req,res,next){
    TodoSchema.findByIdAndRemove(req.params.id, function(err,data)
    {
        if(!err){
           return res.status(200).json({msg: "Deleted Successfully"});
        }
        else{
            return res.status(500).send({msg : err.message});
        }
    });
}

exports.GetAllTodos = function(req,res,next){

    TodoSchema.find({user_id:req.params.userid},function(err,todos){
     
        var AllTodos = {};

        todos.forEach(function(todo){
            AllTodos[todo._id] = todo
        })
        if(err){
            return res.status(500).send({msg: err.message});
        }
        else if(!todos){
            return res.status(401).send({msg : "Nothing Found..."})
        }
        else{
            return res.status(200).json(AllTodos)
        }
    })
}


exports.GetTodoById = function(req,res,next){

    TodoSchema.findOne({_id:req.params.id,user_id:req.params.userid},function(err,todo){
        if(err){
            return res.status(500).send({msg: err.message});
        }
        else if(!todo){
            return res.status(401).send({msg : "Nothing Found Please try again..."})
        }
        else{
            return res.status(200).json(todo)
        }
    })

}