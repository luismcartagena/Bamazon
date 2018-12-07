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
    getUserAction();
  });
};

// Input and data validation
const getUserAction = () => {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "input",
        message: "Please enter the id of the product you wish to purchase:"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like:"
      }
    ])
    .then(answers => {
      // safe guard that they enter an existing ID
      // for loop, do a filter
      const isValid = data.filter(data => data.id === answers.choice).length > 0;
        for (isValid)
      // // IF IT IS A CORRECT ANSWER PROMPT THEM FOR THE QUANTITY
      // inquirer.prompt([

      // ]).then(quantity => {
      //     // don't name inquirere prompt the same name (eg. answers)
      // })
      // switch(answers.choice) {
      //     // case statements
      // }
      getUserAction();
      console.log(answers + "\n\n\n\n\n");
      // connect to the database
    });
};

// Create a new movie
app.post("/movies", function(req, res) {
  connection.query(
    "INSERT INTO movies (movie) VALUES (?)",
    [req.body.movie],
    function(err, result) {
      if (err) {
        return res.status(500).end();
      }

      // Send back the ID of the new movie
      res.json({ id: result.insertId });
      console.log({ id: result.insertId });
    }
  );
});

// Update a movie
app.put("/movies/:id", function(req, res) {
  connection.query(
    "UPDATE movies SET movie = ? WHERE id = ?",
    [req.body.movie, req.params.id],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      } else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

loadApp();
