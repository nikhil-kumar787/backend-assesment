const Rating = require('../Models/Rating')



exports.addRating = async (req, res) => {
    const { rating, rated_by, todo_id } = req.body;
    // console.log(viewed_by,todo_id)
    const todo_rate = await Rating.findOne({ todo_id: todo_id });
    if (!todo_rate) {
            const rate = new Rating({
                rating,
                rated_by, 
               todo_id
            });
            rate.save().then((todo, error) => {
                if (todo) {
                    return res.status(201).json({
                        message: "rating added successfully"
                    });
                }
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong",
                    });
                }
            });
        }else{
            const rate = await Rating.findOne({rated_by:rated_by,todo_id:todo_id})
            
            // console.log("view",view)
            if(!rate){
                const rate = new Rating({
                    rating,
                    rated_by, 
                    todo_id
                 });
                 rate.save().then((todo, error) => {
                     if (todo) {
                         return res.status(201).json({
                             message: "rating added successfully"
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
                    message: "Rating already given by the user"
                })
            }


        }
        
}