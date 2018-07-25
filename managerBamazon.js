//NPM packages
var mysql = require('mysql');
var inquirer = require("inquirer");

//Connecting to MySQL database
var connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user:"root",
    password:"password",
    database:"bamazon"
})

//checking connection
connection.connect (function(err){
    if (err) throw err;
    console.log("connected as id: " + connection.threadId);
    menuOptions();
}) 
//what options the manager has 
var menuOptions = function () {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add To Inventory",
            "Add New Product",
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View Products for Sale":
                allProducts();
                break;

            case "View Low Inventory":
                lowStock();
                break;

            case "Add To Inventory":
                addStock();
                break;

            case "Add New Product":
                newProduct();
                break;

        }
    })
}
//displays all the products even after new ones are added
var allProducts = function(){
    connection.query("SELECT * FROM products", function(err,res){
        for(var i=0;i <res.length; i++){
            console.log(res[i].id+")"+res[i].product_name+"|"+res[i].department_name+"|Price:$"+res[i].price+"|"+res[i].stock_quantity+"Left"+" \n ");
        }
        menuOptions();
    })
}


//shows manager any product thats stock quantity is below 5
var lowStock = function() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err,res){
        for(var i=0;i <res.length; i++){
            console.log(res[i].id+")"+res[i].product_name+"|"+res[i].department_name+"|Price:$"+res[i].price+"|"+res[i].stock_quantity+"Left"+" \n ");
        }
        menuOptions();
    })
}

//lets manager add more product stock
var addStock = function(res){
    connection.query("SELECT * FROM products", function(err,res){
        for(var i=0;i <res.length; i++){
            console.log(res[i].id+")"+res[i].product_name+"|"+res[i].department_name+"|Price:$"+res[i].price+"|"+res[i].stock_quantity+"Left"+" \n ");
         }
          inquirer.prompt([{
              type:"input",
                name:"product",
                message:"What product do you wish to add stock quantity to?"
            },{
                type:"input",
                name:"stock",
                message:"How many do you want to add?",
                validate: function(value){
                    if(isNaN(value)===false){
                        return true;
                    } else {
                        return false;
                    }
                }
                //adds the data into MySQL database databaseproduct_name:answer.prompt_name
            }]).then(function(answer){
                // connection.query("UPDATE products SET stock_quantity ='"+(answer.stock)+"' where product_name='"+(answer.product)+"'", {
                    connection.query("UPDATE products SET stock_quantity = stock_quantity +'"+(answer.stock)+"' where product_name='"+(answer.product)+"'", {

                    stock_quantity:answer.stock
                },function(err,res){
                    console.log("Your Product Stock has been updated!");
                    menuOptions();
                })
            })
    })
}

    


// lets manager add a product
var newProduct = function() {
    inquirer.prompt([{
        name:"item",
        type:"input",
        message:"What is the product you wish to add?"
    },{
        name:"department",
        type:"input",
        message:"What department would you find this product in?"
    },{
        name:"price",
        type:"input",
        message:"How much does this item cost?",
        validate: function(value){
            if(isNaN(value)===false){
                return true;
            } else {
                return false;
            }
        }
    },{
        name:"stock",
        type:"input",
        message:"How many do we have in stock?",
        validate: function(value){
            if(isNaN(value)===false){
                return true;
            } else {
                return false;
            }
        }
    //adds the data into MySQL database databaseproduct_name:answer.prompt_name
    }]).then(function(answer){
        connection.query("INSERT INTO products SET ?", {
            product_name:answer.item,
            department_name:answer.department,
            price:answer.price,
            stock_quantity:answer.stock
        },function(err,res){
            console.log("Your Product was Added!");
            menuOptions();
        })
    })
}
