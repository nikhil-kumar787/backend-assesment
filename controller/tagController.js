const Tag = require('../Models/Tag')
const User = require('../Models/User')


exports.addtag = async (req, res) => {


    const { tag_title, posted_by,todo_id,category } = req.body;
    

    await User.find({ _id: posted_by }).exec((err, user) => {

        if (user) {
            const tag = new Tag({
                tag_title,
               posted_by,
               todo_id,
               category
            });

            tag.save((error, todo) => {
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong",
                    });

                }

                if (tag) {


                    return res.status(201).json({
                        message: "Tag added succefully"
                    });
                }

            });

        }


    })

}


exports.gettagById = async (req, res) => {
    let id = req.params.id;

    const tag = await Tag.find({ todo_id: id }).exec((err,usr) => {
        if(usr) {
            res.status(200).json({ usr });
        }
    })

    

}

exports.updatetag = async (req, res) => {
    let id = req.params.id;
    const { tag_title ,category} =
        req.body;
    const tag = await Tag.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                tag_title: tag_title,
                category: category
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

exports.deletetag = async (req, res) => {
    let id = req.params.id;

    const tag = await Tag.findOneAndDelete({ _id: id });

    if (tag) {
        res.status(201).json({ message: "Tag removed" });
    } else {
        res.status(400).json({ message: "Something went wrong" });
    }


}