//Imports 
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

//Variables
interface inventory = {
    lemons: 0;
    sugar: 0;
    iceCubes: 0;
    cups: 0;
    advertising: 0;
};

const prices = {
    lemons: 0.30,
    sugar: 0.25,
    iceCubes: 0.01,
    cups: 0.10,
    advertising: 1.50
}

interface assests = {
    money : 20.00;
};

const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Windy', 'Hot', 'Cold'];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


/*
function name: purchase 
params: item (key of inventory), quantity (number), money (number)
description: This function allows the player to purchase items for their lemonade stand. It checks if the player has enough money to make the purchase and updates the inventory and money accordingly.
*/
function purchase(item: keyof typeof inventory, quantity: number, money: number): boolean {
}
//Main Function
async function main() {
    //Welcome Message to Gamer 
    console.log('Welcome to the Lemonade Stand Game!');
    console.log('');
    console.log('In this small town known as sunny San Diego,you are in charge of running your own lemonade stand');
    console.log('With businesses, you have lots of responsibility!');
    console.log('You will need to buy supplies, set your prices, and manage your money wisely to make a profit.');
    console.log('If you make the most money, you are the winner!');
    console.log('');

    //Starting the Game, read user input
    const rl = createInterface({ input, output });
    const answer = await rl.question('Are you starting a new game? Yes or No.\n');


    if(answer.toLowerCase() === 'yes') {
        console.log('Great! The game is starting...');
        // Call function to start a new game
    } 
    else if(answer.toLowerCase() === 'no') {
        console.log('Okay, maybe next time!');
        // Exit or return to main menu
    } 
    else {
        console.log('Invalid input. Please type "Yes" or "No".');
        // Optionally, you can loop back to ask the question again
    }

    rl.close();

}

main();