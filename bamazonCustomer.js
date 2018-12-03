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
}


// Display the main table of products
const displayProducts = () => {
    // connect to the database
    connection.query("SELECT  FROM products", (err, result) => {
        if (err) {
            throw err;
        }
    // })

    // display each product (can use a package for nice display)
    const data = products.map(product => [product.id, product.department_name, product.name, product.price, product.stock_quantity]);
    console.log(table(data));
    getUserAction();
    });
}



// Input and data validation 
const getUserAction = () => {
    inquirer.prompt([
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
    ]).then(answers => {
        // safe guard that they enter an existing ID
        // for loop, do a filter
        // const isValid = products.filter(product => product.id === answers.choice).length > 0;

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
    })
}

loadApp();