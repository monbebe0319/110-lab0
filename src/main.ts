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

function makeLemonadePitcher(): boolean {
  if (
    inventory.lemons >= Recipe.lemonsPerPitcher &&
    inventory.sugar >= Recipe.sugarPerPitcher &&
    inventory.iceCubes >= Recipe.iceCubesPerPitcher &&
    inventory.cups >= Recipe.cupsPerPitcher
  ) {
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
  const weatherOptions: weatherConditions[] = [
    "Sunny",
    "Cloudy",
    "Rainy",
    "Windy",
    "Hot",
    "Cold",
  ];
  const randomIndex = Math.floor(Math.random() * weatherOptions.length);
  return weatherOptions[randomIndex];
}

const DAYS: daysOfWeek[] = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
let dayCounter = 0;

function generateDay(): daysOfWeek {
  const day = DAYS[dayCounter % DAYS.length];
  dayCounter++;
  return day;
}


/*
function name: calculateCustomers
params: weather (weatherConditions), day (daysOfWeek)
description: This function calculates the number of potential customers based on the weather conditions and the day of the week.
It uses predefined multipliers for each weather condition and day to determine the final customer count.
*/

function calculateCustomers(weather: weatherConditions, day: daysOfWeek): number {
  const base = baseCustomersWeather[weather];
  const multiplier = DAY_MULTIPLIER[day];
  return Math.floor(base * multiplier);
}


//Daily Report 
function fmtMoney(n: number) { return `$${n.toFixed(2)}`; }

type DailyReport = {
  dayNumber: number;
  dayName: daysOfWeek;
  weather: weatherConditions;
  sold: number;
  potentialCustomers: number;
  inventory: Inventory;     // snapshot after sales
  cash: number;             // end-of-day cash
};

function printDailyReport(info: DailyReport) {
  const inv = info.inventory;
  console.log("\n===== End of Day Report =====");
  console.log(`Day ${info.dayNumber} — ${info.dayName} — Weather: ${info.weather}`);
  console.log(`Customers (potential): ${info.potentialCustomers}`);
  console.log(`Cups of lemonade sold: ${info.sold}`);
  console.log("Inventory remaining:");
  console.log(`  cups:       ${inv.cups}`);
  console.log(`  lemons:     ${inv.lemons}`);
  console.log(`  sugar:      ${inv.sugar}`);
  console.log(`  ice cubes:  ${inv.iceCubes}`);
  console.log(`  advertising:${inv.advertising}`);
  console.log(`Cash balance: ${fmtMoney(info.cash)}`);
  console.log("=============================\n");
}


// Main Function (interactive)
async function main() {
  // Welcome Message to Gamer 
  console.log('Welcome to the Lemonade Stand Game!');
  console.log('');
  console.log('In this small town known as sunny San Diego, you are in charge of running your own lemonade stand');
  console.log('With businesses, you have lots of responsibility!');
  console.log('You will need to buy supplies, set your prices, and manage your money wisely to make a profit.');
  console.log('If you make the most money, you are the winner!');
  console.log('');

  const rl = createInterface({ input, output });

  // helpers for prompts
  async function askNumber(prompt: string, def?: number): Promise<number> {
    while (true) {
      const raw = await rl.question(def !== undefined ? `${prompt} [${def}]: ` : `${prompt}: `);
      const s = raw.trim() === "" && def !== undefined ? String(def) : raw;
      const n = Number(s);
      if (Number.isFinite(n) && n >= 0) return n;
      console.log("Please enter a non-negative number.");
    }
  }
  async function askYesNo(prompt: string, def: "y" | "n" = "y"): Promise<boolean> {
    const raw = (await rl.question(`${prompt} [${def.toUpperCase()}]: `)).trim().toLowerCase();
    if (raw === "") return def === "y";
    return raw.startsWith("y");
  }

  const answer = (await rl.question('Are you starting a new game? Yes or No.\n')).trim().toLowerCase();

  if (answer === 'yes') {
    console.log('Great! The game is starting...\n');

    let dayNumber = 1;
    let keepPlaying = true;

    while (keepPlaying) {
      const dayName = generateDay();           // your function
      const weather = generateWeather();       // your function

      console.log(`\n--- Day ${dayNumber} (${dayName}) — Weather: ${weather} ---`);
      console.log(`Cash: ${fmtMoney(assets.money)}`);
      console.log(`Inventory: cups=${inventory.cups}, lemons=${inventory.lemons}, sugar=${inventory.sugar}, ice=${inventory.iceCubes}, ads=${inventory.advertising}`);
      console.log(`Prices: cups ${fmtMoney(prices.cups)}, lemons ${fmtMoney(prices.lemons)}, sugar ${fmtMoney(prices.sugar)}, iceCube ${fmtMoney(prices.iceCubes)}, advertising ${fmtMoney(prices.advertising)}`);

      // Morning: let the player buy supplies (validates they can afford it)
      if (await askYesNo("Do you want to buy supplies today?", "y")) {
        while (true) {
          const qCups  = await askNumber("How many cups to buy?", 20);
          const qLem   = await askNumber("How many lemons to buy?", 10);
          const qSug   = await askNumber("How many sugar units to buy?", 20);
          const qIce   = await askNumber("How many ice cubes to buy?", 100);
          const qAds   = await askNumber("How many advertising units to buy?", 0);

          // pre-check total cost before purchasing
          const totalCost =
            qCups * prices.cups +
            qLem  * prices.lemons +
            qSug  * prices.sugar +
            qIce  * prices.iceCubes +
            qAds  * prices.advertising;

          if (totalCost > assets.money) {
            console.log(`You can't afford that (need ${fmtMoney(totalCost)}, have ${fmtMoney(assets.money)}). Try smaller amounts.`);
            continue; // re-prompt
          }

          // apply purchases via your purchase() helper
          if (qCups) purchase("cups", qCups);
          if (qLem)  purchase("lemons", qLem);
          if (qSug)  purchase("sugar", qSug);
          if (qIce)  purchase("iceCubes", qIce);
          if (qAds)  purchase("advertising", qAds);

          console.log(`Purchased supplies for ${fmtMoney(totalCost)}. Cash now ${fmtMoney(assets.money)}.`);
          break;
        }
      }

      // Let the player set a price per cup for the day
      const pricePerCup = await askNumber("Set your price per cup ($)", 1.0);

      // Estimate demand for the day
      const potentialCustomers = calculateCustomers(weather, dayName); // your function

      // Sales: make pitchers on demand and sell up to potentialCustomers
      let sold = 0;
      for (let i = 0; i < potentialCustomers; i++) {
        if (inventory.cupsOfLemonade <= 0) {
          const made = makeLemonadePitcher(); // your function
          if (!made) break;                   // out of ingredients
        }
        // sell one cup
        inventory.cupsOfLemonade -= 1;
        assets.money += pricePerCup;
        sold++;
      }

      // End-of-day realism: ice melts
      inventory.iceCubes = 0;

      // End-of-day report
      printDailyReport({
        dayNumber,
        dayName,
        weather,
        sold,
        potentialCustomers,
        inventory: { ...inventory }, // snapshot after sales
        cash: assets.money,
      });

      dayNumber++;
      keepPlaying = await askYesNo("Play another day?", "y");
    }

    console.log("🏁 Simulation complete. Thanks for playing!");
  } else if (answer === 'no') {
    console.log('Okay, maybe next time!');
  } else {
    console.log('Invalid input. Please type "Yes" or "No".');
  }

  await rl.close();
}

main();
