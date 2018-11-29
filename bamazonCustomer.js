const inquirer = require("inquier");
const mysql = require("mysql");
const table = require("table").table;

// const connection = mysql.createConnection({
//     password: "root",
//     user: "root",
//     host: "localhost",
//     port: 3306,
//     database: "bamazon_db"
// });

// connection.connect(err => {
//     if (err) {
//         throw err;
//     }

//     start();
// })


const products = [
    {
        id: 1,
        name: "Jordan 13 Retro",
        price: 220.00,
        stock_quantity: 100
    },
    {
        id: 2,
        name: "Jordan 11",
        price: 230.00,
        stock_quantity: 100

    },
    {
        id: 3,
        name: "jordan 7 retro",
        price: 220.00,
        stock_quantity: 100

    }
]


const start = () => {
    // running this application will first diaplay all of the items available for sale
    // include the ids, names, and prices of products for sale.
    displayProducts();
    // app prompt user
    getUserAction();
}

const getUserAction = () => {
    // the app should then 
    inquirer.prompt([
        {
            name: "choice",
            type: "input",
            message: "Please enter the id of the product you wish to purchase:"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many:"
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

        console.log(answers + "\n\n\n\n\n");
        // connect to the database
        start();
    })
}
const displayProducts = () => {
    // connect to the database
    // select * from products;
    // display each product (can use a package for nice display)
    const data = products.map(product => [product.id, product,name, product.price, product.stock_quantity]);
    console.log(table(data));
}

start();