const Todo = require('../Models/Todo')

const User = require('../Models/User')


exports.getalltodo = async (req, res) => {
    const todo = await Todo.find();

    res.status(200).json({ todo });

}

exports.gettodoById = async (req, res) => {
    let id = req.params.id;

    const {page=1, limit=10} = req.query;

    const todo = await Todo.find({ userId: id }).limit(limit * 1).skip((page -1) * limit )

    res.status(200).json({ total:todo.length,todo,pageNo:page});

}

exports.addtodo = async (req, res) => {
    // req.headers.authorization = `Bearer ` + req.body.token
//    const jwtToken = req.body.token;
//    console.log(jwtToken)
//  headers['Authorization'] = 'Bearer ' + jwtToken

    const { userid, title, category } = req.body;
    console.log(userid)
    console.log(title, category);

    await User.find({ _id: userid }).exec((err, user) => {

        if (user) {
            const todo = new Todo({
                userId:userid,
                title,
                category,

            });

            todo.save((error, todo) => {
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong",
                    });

                }

                if (todo) {


                    return res.status(201).json({
                        message: "Successfully addded a Todo"
                    });
                }

            });

        }


    })










}

exports.updatetodo = async (req, res) => {
    let id = req.params.id;
    const { username, title, category } =
        req.body;
    const todo = await Todo.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                username: username,
                title: title,
                category: category,
                
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
};


exports.deletetodo = async (req, res) => {
    let id = req.params.id;

    const todo = await Todo.findOneAndDelete({ _id: id });

    if (todo) {
        res.status(201).json({ message: "Todo removed" });
    } else {
        res.status(400).json({ message: "Something went wrong" });
    }


}


exports.updateStatus = async (req,res) => {

   const {todoid} = req.body; 
   await Todo.find({_id:todoid}).exec(async (err, update) => {
      
      if(update[0].status == true) {
          res.send("Already task completed")
      }
      else {
        await Todo.findOneAndUpdate(
            { _id: todoid },
            {
                $set: {
                   status: true,
                
                },
            },
            { new: true }
        ) .exec()
        .then(async (result) => {
            
            console.log(result.userId)
            await User.findOneAndUpdate(
                { _id: result.userId },
                {$inc : {'task_count' : 1}},
                { new: true }
            )
             res.status(200).json({ message: result });
        })
        .catch((e) => {
            console.log(e);
             res.status(400).json({ error: e });
        });
      }
   })
        



}

exports.maxCount = async (req,res) => {
   

//     User.findOne({ field1 : 1 }).sort(task_count, 1).run( function(err, doc) {
//         if(doc) {
//             res.status(200).json({maxno:doc})
//         }
//    });
// const maxQuery = await User.find({}).sort({ task_count: -1 }).limit(1).then(user => user[0].task_count);
// console.log(maxQuery)
// res.send(maxQuery);


var findQuery = await User.find().sort({task_count : -1}).limit(2);

findQuery.exec(function(err, maxResult){
    if (err) {return err;}
      
    if(maxResult) {
        console.log(maxResult)
        res.status(200).json({maxResult})
    }
    // do stuff with maxResult[0]

});

}



