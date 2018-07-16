const sql = require("mysql");
const inquirer = require("inquirer")

//-----------------------MYSQL-------------------------//

const connection = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bamazon_db'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected")
showTable() 
})
// //---------------------INQUIRER---------------------//
function showTable() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res)
start(res)  
})
}

function start(res) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "What is the ID of the item"
      }
    ])
    .then(function(answer) {
      connection.query("SELECT * FROM PRODUCTS WHERE item_id")
      var choiceId = parseInt(answer.id);

      if (choiceId === res.item_id) {
units()   
 }
      else {
        console.log("\nThat item is not in the inventory.");
        start();
      }
    });
}



var units = function () {
  inquirer.prompt({
    name: "quantity",
    type: "input",
    message: "What is the ID of the product?"
  }).then(function (answer) {
    if (answer.quantity > 10) {
      console.log("No more in stock!")
      start()
    }
    else {
      if (answer.quantity > answer.stock_quantity) {
        console.log("Product in stock!")
        makePurchase()
      }
    }

  })
}


function makePurchase(){
  
}