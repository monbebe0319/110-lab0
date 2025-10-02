//Imports 
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

//Variables
interface Inventory {
    lemons: number;
    sugar: number;
    iceCubes: number;
    cups: number;
    advertising: number;
    cupsOfLemonade: number;
}

const inventory: Inventory = {
    lemons: 0,
    sugar: 0,
    iceCubes: 0,
    cups: 0,
    advertising: 0,
    cupsOfLemonade: 0
};

const prices = {
    lemons: 0.30,
    sugar: 0.10,
    iceCubes: 0.01,
    cups: 0.10,
    advertising: 1.50
}

interface Assets {
    money: number;
}

const assets: Assets = {
    money: 50.00
};

//Lemonde Recipe 
const Recipe = {
    lemonsPerPitcher: 4,
    sugarPerPitcher: 4, 
    iceCubesPerPitcher: 10,
    cupsPerPitcher: 10
};

type weatherConditions = 'Sunny' | 'Cloudy' | 'Rainy' | 'Windy' | 'Hot' | 'Cold';
type daysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';


//Number of customers per day
const baseCustomersWeather: Record<weatherConditions, number> = {
    'Sunny': 15,
    'Cloudy': 10,
    'Rainy': 5,
    'Windy': 8,
    'Hot': 25,
    'Cold': 2
}

const DAY_MULTIPLIER: Record<daysOfWeek, number> = {
  Monday: 0.9,
  Tuesday: 0.95,
  Wednesday: 1.0,
  Thursday: 1.05,
  Friday: 1.2,
  Saturday: 1.35,
  Sunday: 1.25,
};




/*
function name: purchase 
params: item (key of prices), quantity (number)
description: This function allows the player to purchase items for their lemonade stand. It checks if the player has enough money to make the purchase and updates the inventory and money accordingly.
*/
function purchase(item: keyof typeof prices, quantity: number): boolean {
    const cost = prices[item] * quantity;
    if (assets.money >= cost) {
        inventory[item] += quantity;
        assets.money -= cost;
        return true;
    }
    return false;
}

/*
function name: makeLemonade
params: item (key of inventory), quantity (number)
description: This function allows the player to make lemonade by using the ingredients in their inventory. 
It checks if there are enough ingredients to make the specified quantity of lemonade and updates the inventory accordingly.
The function refers to the Recipe object to determine how many ingredients are needed per pitcher and per cup.
*/

function makeLemonadePitcher(item: keyof typeof inventory): boolean {
    if(inventory.lemons >= Recipe.lemonsPerPitcher && inventory.sugar >= Recipe.sugarPerPitcher && inventory.iceCubes >= Recipe.iceCubesPerPitcher && inventory.cups >= Recipe.cupsPerPitcher) {
        inventory.lemons -= Recipe.lemonsPerPitcher;
        inventory.sugar -= Recipe.sugarPerPitcher;
        inventory.iceCubes -= Recipe.iceCubesPerPitcher;
        inventory.cups -= Recipe.cupsPerPitcher;
        inventory.cupsOfLemonade += Recipe.cupsPerPitcher;
        return true;
    }

    return false;
}

/*
function name: generateWeather
params: none
description: this function randomly generates weather conditions for the day from a predefined list of weather conditions.
It returns a string representing the weather condition.
*/
function generateWeather(): weatherConditions {

}


function generateDay(): daysOfWeek {
}

/*
function name: calculateCustomers
params: weather (weatherConditions), day (daysOfWeek)
description: This function calculates the number of potential customers based on the weather conditions and the day of the week. 
It uses predefined multipliers for each weather condition and day to determine the final customer count.    
*/
function calculateCustomers(weather: weatherConditions, day: daysOfWeek): number {

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