//NPM packages
var mysql = require('mysql');
var inquirer = require("inquirer");
var colors = require('colors');
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
    console.log("------------------------------------------------------------".magenta);
    console.log("connected as id: " + connection.threadId);
    console.log("------------------------------------------------------------".green);

    displayTable();
}) 
//Displays the Products table in MySQL to the command line
var displayTable = function(){
    connection.query("SELECT * FROM products", function(err,res){
        for(var i=0;i <res.length; i++){
            console.log(res[i].id+")"+res[i].product_name+"|"+res[i].department_name+"|Price:$"+res[i].price+"|"+res[i].stock_quantity+"Left"+" \n ");
        }
        customerChoice(res);
    })
}

//lets user select a  product for purchase
var customerChoice = function(res){
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "what do you want to buy?"
    }]).then(function(answer){
        var correct = false;
        for(var i=0; i<res.length;i++){
            if(res[i].product_name==answer.choice){
                correct = true;
                var product= answer.choice;
                var id=i;
        //asks the customer how many they want to buy of that product
                inquirer.prompt({
                    type: "input",
                    name: "amount",
                    message: "How many do you want?",
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        } else{
                            return false;
                        }
                    }
                    //makes sure there is enough in stock for what the users quantity
                }).then(function(answer){
                    if((res[id].stock_quantity-answer.amount)>0){
                        connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-answer.amount)+"' WHERE product_name='"+product+"'", function(err,res2){
                            console.log("------------------------------------------------------------".green);
                            console.log("Product has been purchased!".green+ "$".green+((answer.amount) * (res[id].price)));
                            console.log("------------------------------------------------------------");
                            displayTable();
                        })
                    } else{
                        console.log("Not enough in stock".red);
                        customerChoice(res);
                    }
                })
            }
        } 
    })
}



















