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
    console.log(`\nSuccess, connected as id: ${connection.threadId}\n\n`);
    displayProducts();
  });
};

// Display the main table of products
const displayProducts = () => {
  console.log(`               WELCOME TO BAMAZON\n\n`);

  // connect to the database
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) {
      throw err;
    }

    // display each product
    const products = res.map(res => [
      res.id,
      // res.department_name,
      res.name,
      res.price,
      res.stock_quantity
    ]);

    // console.log(res[0].name);

    console.log(` id    Product Name                 Cost($)  Stock`);
    console.log(table(products));

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
          "SELECT id, name, stock_quantity FROM products WHERE ?",
          [{ id: answers.choice }],
          (err, res) => {
            // console.log(res);
            if (err) {
              throw err;
            }
            if (answers.quantity > res[0].stock_quantity) {
              console.log(
                `\n\n\OOPS! WE'VE RAN OUT!! Only ${
                  res[0].stock_quantity
                } unit(s) in stock. Please try again.\n\n\n`
              );
              displayProducts();
            } else {
              let newQuantity = res[0].stock_quantity - answers.quantity;
              updatedInventory(answers.quantity, newQuantity, res[0].id);
            }
          }
        );
      });
  });
};


// Update stock_quantity
const updatedInventory = (quantityPurchased, newQuantity, id) => {
  
  let inventory = [];
  inventory.push(newQuantity, id);

  // connect to the database
  connection.query(
    "UPDATE products SET stock_quantity = ? WHERE id = ?",
    inventory,
    (err, res) => {
      if (err) {
        throw err;
      }

      // If no rows were changed, then the ID must not exist, so 404
      console.log("~ Stock Quantity Updated ~");
      displayCost();
    }
  );
};

// Display Updated Inventory
const displayCost = (quantityPurchased, id) => {
  
  let totalInventory = [];
  totalInventory.push(quantityPurchased, id);

  connection.query(
    "SELECT name, ? * price AS Total FROM products WHERE id = ?", 
    totalInventory, 
    (err, res) => {
        if (err) {
            throw err;
        }
        let totalPrice = res[0].Total.toFixed(2);
        console.log(`You purchased ${quantityPurchased} units of ${res[0].name} for a total cost of $${totalPrice}.`);
    });
};

loadApp();
