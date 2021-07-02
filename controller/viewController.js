const Todo = require('../Models/Todo')

const User = require('../Models/User')
const View = require('../Models/View')



exports.viewtodoByUser = async (req, res) => {
 

    const {todo_id,userId} = req.body;
    

    await View.find({todo_id:todo_id}).exec( async(err,view) => {
        console.log
        if(view.userId == userId) {
        res.status(200).json({message:"User already viewed the todo"})
        }
        else {
            await View.findOneAndUpdate(
                { _id: view._id },
                {$inc : {'views' : 1}},
                {
                    $set: {
                        userId: userId,
                        todo_id: todo_id,
                       
                    },
                },
                { new: true }
            )
            .exec()
            .then((result) => {
                console.log(result);
                res.status(200).json({ message: result });
            })
            .catch((e) => {
                console.log(e);
                res.status(400).json({ error: e });
            });
        }
    })
}