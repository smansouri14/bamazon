# Bamazon and managerBamazon

 * Bamazon is the 


### Prerequisites

* You will need to install following  npm packages 
    * inquirer: npm install inquirer
    * MySql: npm install mysql

### Installing

CD into the correct folder and copy and paste each npm intall into the command line
This will add it into the package.json dependencies.

### What Bamazon does
*   Run the application in node
*   The app should then prompt users with two messages.
    * *  The first should ask them the ID of the product they would like to buy.
    * *   The second message should ask how many units of the product they would like to buy.
*   Once the customer has placed the order, the application will check if your store has enough of the product to meet the customer's request.
*   If not, the app will log a phrase like Insufficient quantity!, and then prevent the order from going through.
*   However, if your store does have enough of the product, it will fulfill the customer's order.
*   This means updating the SQL database to reflect the remaining quantity.
*   Once the update goes through, show the customer the total cost of their purchase.


### What Bamazon does

*   Run the application in node
*   The app will then give the manager a list of commands
    * * View Products for Sale
        * * Shows all available products
    * * View Low Inventory
        * * If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
    * * Add to Inventory
        * * If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
    * * Add New Product
        * * If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.










