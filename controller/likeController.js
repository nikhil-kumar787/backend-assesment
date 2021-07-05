const Like = require('../Models/Like')


exports.addlikes = async (req, res) => {
    const { liked_by, todo_id } = req.body;
    const todo_like = await Like.findOne({ todo_id: todo_id });
    if (!todo_like) {
            // viewed_by = []   
            const like = new Like({
                liked_by, 
               todo_id
            });
            like.save().then((todo, error) => {
                if (todo) {
                    return res.status(201).json({
                        message: "liked_by added successfully"
                    });
                }
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong",
                    });
                }
            });
        }else{
            const like = await Like.findOne({liked_by:liked_by,todo_id:todo_id})
            
            // console.log("view",view)
            if(!like){
                const like = new Like({
                    liked_by, 
                    todo_id
                 });
                 like.save().then((todo, error) => {
                     if (todo) {
                         return res.status(201).json({
                             message: "likeed_by added successfully"
                         });
                     }
                     if (error) {
                         return res.status(400).json({
                             message: "Something went wrong",
                         });
                     }
                 });
            }else{
                return res.status(201).json({
                    message: "already liked by the user"
                })
            }


        }
        
}