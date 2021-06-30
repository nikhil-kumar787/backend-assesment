const Comment = require('../Models/Comment')
const User = require('../Models/User')


exports.addcomment = async (req, res) => {


    const { comments, posted_by } = req.body;
    

    await User.find({ _id: posted_by }).exec((err, user) => {

        if (user) {
            const comment = new Comment({
               comments,
               posted_by
            });

            comment.save((error, todo) => {
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong",
                    });

                }

                if (comment) {


                    return res.status(201).json({
                        message: "Comment added succefully"
                    });
                }

            });

        }


    })

}


exports.getcommentById = async (req, res) => {
    let id = req.params.id;

    const comment = await Comment.find({ posted_by: id }).exec((err,usr) => {
        if(usr) {
            res.status(200).json({ usr });
        }
    })

    

}