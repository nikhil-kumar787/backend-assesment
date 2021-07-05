
const Todo = require('../Models/Todo');
const User = require('../Models/User')

const excel = require("exceljs");

const download = (req, res) => {
  User.find().then((objs) => {
    Todo.find({userId: objs._id}).then((todos) => {
    //  console.log("todos:",todos)
     let user = [];
    let todo = [];
    
    objs.forEach((obj) => {
      
      user.push({
        id: obj._id,
        email: obj.email,
        date: obj.date,
        
      });
        
     
    });
    todos.forEach((to) => {
      // console.log(to)
      todo.push({
        todo_id: to._id,
        title: to.title,
        status: to.status,
        category:to.category
        
      });
        
     
    });
    // console.log(user)
   console.log(user)

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("User");
    

    worksheet.columns = [
      { header: "Id", key: "id", width: 25 },
      { header: "Email", key: "email", width: 25 },
      { header: "Date", key: "date", width: 25 },
      { header: "Title", key: "title", width: 25 },
      { header: "Status", key: "status", width: 25 },
      { header: "Category", key: "category", width: 25 },
    
    ];

    // Add Array Rows
    worksheet.addRows(user);
    worksheet.addRows(todo);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "user.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
    })
    
  });
};

module.exports = {
  download,
};