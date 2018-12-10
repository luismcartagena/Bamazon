const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("table").table;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "guest",
  password: "Sunday2018!",
  database: "bamazon_db"
});

// Load Bamazon
const loadApp = () => {
  connection.connect(err => {
    if (err) {
      throw err;
    }
    console.log("connected as id " + connection.threadId + "\n");
    displayProducts();
  });
};

// Display the main table of products
const displayProducts = () => {
  // connect to the database
  connection.query("SELECT * FROM products", (err, result) => {
    if (err) {
      throw err;
    }

    // display each product
    const data = result.map(result => [
      result.id,
      result.department_name,
      result.name,
      result.price,
      result.stock_quantity
    ]);
    console.log(
      ` id    Department    Product Name                 Cost($)  Stock`
    );
    console.log(table(data));
    // getUserAction();
    //     getUserAction();
    //   });
    // };

    // const getUserAction = (array) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Please enter the id of the product you wish to purchase:",
          validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Please enter a number";
          },
          filter: Number
        },
        {
          type: "input",
          name: "quantity",
          message: "How many would you like:",
          validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Please enter a number";
          },
          filter: Number
        }
      ])
      .then(answers => {
        // safe guard that they enter an existing ID
        connection.query(
          "SELECT id, stock_quantity FROM products WHERE ?",
          [{name: answers.choice}],
          (err, result) => {
            if (err) {
              throw err;
            }
            if (answers.quantity > result[0].stock_quantity) {
              console.log(
                `There is only ${
                  result[0].stock_quantity
                } units of that product currently in stock. Please enter a different amount to buy.`
              );
              displayProducts();
            } else {
              let newQuantity = result[0].stock_quantity - answers.quantity;
              updateStock(answers.quantity, newQuantity, result[0].id);
            }
          }
        );
      });
  });
};

// Update stock_quantity

// const updateStock = () => {
//     // connect to the database
//     connection.query(
//       "UPDATE products SET stock_quantity = ? WHERE id = ?",
//       [req.body.stock_quantity, req.params.id],
//       function(err, result) {
//         if (err) {
//           throw err;
//         } else if (result.changedRows === 0) {
//           // If no rows were changed, then the ID must not exist, so 404
//           console.log("id does not exist");
//           displayProducts();
//         }
//         result.status(200).end();
//       }
//     );
//   };

// Create a new movie
// app.post("/movies", function(req, res) {
//   connection.query(
//     "INSERT INTO movies (movie) VALUES (?)",
//     [req.body.movie],
//     function(err, result) {
//       if (err) {
//         return res.status(500).end();
//       }

//       // Send back the ID of the new movie
//       res.json({ id: result.insertId });
//       console.log({ id: result.insertId });
//     }
//   );
// });

loadApp();
