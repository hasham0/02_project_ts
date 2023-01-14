#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// type casting
type user = {
  id: string;
  pin: number;
  totalAmount: number;
  withdrawAmount: number[];
  depositeAmount: number[];
};

// demo data of users for bank
const user = [
  {
    id: "ali",
    pin: 1234,
    totalAmount: 10000,
    withdrawAmount: [],
    depositeAmount: [],
  },
  {
    id: "zia",
    pin: 3456,
    totalAmount: 50000,
    withdrawAmount: [],
    depositeAmount: [],
  },
  {
    id: "jibran",
    pin: 5678,
    totalAmount: 30000,
    withdrawAmount: [],
    depositeAmount: [],
  },
];

// verify existing users
async function login() {
  // taking user name
  const id = await inquirer.prompt([
    {
      type: "string",
      messgae: "Enter the user name:",
      name: "user_name",
    },
  ]);
  // authenticate user name
  let check = user.findIndex((val) => val.id === id.user_name);
  if (user[check].id === id.user_name) {
    console.log("valid user name");

    //taking user pin
    const pass = await inquirer.prompt([
      {
        type: "number",
        messgae: "Enter the password:",
        name: "passcode",
      },
    ]);
    // authenticate user pin
    check = user.findIndex((val) => val.pin === pass.passcode);
    if (user[check].pin === pass.passcode) {
      console.log("valid passcode");
      console.log(chalk.green("LOGIN SUCCESSFUL"));
    } else {
      console.log(chalk.red("Invalid passcode"));
      return;
    }
  } else {
    console.log(chalk.red("Invalid user name"));
    return;
  }

  // taking options
  const options = await inquirer.prompt([
    {
      name: "userOptions",
      type: "list",
      choices: [
        "check balance",
        "deposite amount",
        "withdraw amount",
        "view information",
      ],
      message: "select an option",
    },
  ]);
  // performing check balance
  if (options.userOptions === "check balance") {
    console.log(chalk.white(options.userOptions));
    console.log(
      `your total money in this account is ${user[check].totalAmount}`
    );
  }
  // performing deposite amount
  else if (options.userOptions === "deposite amount") {
    console.log(chalk.white(options.userOptions));
    const insertAmount = await inquirer.prompt([
      {
        type: "number",
        message: "Enter the amount of money to deposite:",
        name: "deposite",
      },
    ]);
    user[check].totalAmount += insertAmount.deposite;
    chalk.blue(insertAmount.message);
    console.log(
      `your total money in this account after depoite ${insertAmount.deposite} is ${user[0].totalAmount}`
    );
  }
  // performing withdraw balance
  else if (options.userOptions === "withdraw amount") {
    // console.log(chalk.white(options.userOptions));
    const withdrawAmount = await inquirer.prompt([
      {
        type: "number",
        message: "Enter the amount of money to withdraw:",
        name: "withdraw",
      },
    ]);
    user[check].totalAmount -= withdrawAmount.withdraw;
    chalk.blue(withdrawAmount.message);
    console.log(
      `your total money in this account after withdraw ${withdrawAmount.withdraw} is ${user[check].totalAmount}`
    );
  }
  // performing view information
  else if (options.userOptions === "view information") {
    console.log(chalk.white(options.userOptions));
    const data = user[check];
    console.log(data);
  }
}

// making account for new users
async function newUser() {
  //user name
  const userName = await inquirer.prompt([
    {
      name: "username",
      type: "string",
      message: "Enter your user name:",
    },
  ]);
  //pin
  const passCode = await inquirer.prompt([
    {
      name: "passcode",
      type: "number",
      message: "Enter your passcode:",
    },
  ]);
  // amount to deposite
  const totalAmount = await inquirer.prompt([
    {
      name: "totalamount",
      type: "number",
      message: "Enter your amount to deposite:",
    },
  ]);

  //checking all the require information
  if (userName.username && passCode.passcode && totalAmount.totalamount) {
    // creating new user object
    const newUser = Object.create({
      id: userName.username,
      pin: passCode.passcode,
      totalAmount: totalAmount.totalamount,
      withdrawAmount: [],
      depositeAmount: [],
    });
    // pushing newuser object to user array
    user.push(newUser);
    console.log("account created");
  } else {
    console.log("invalid information try again");
    return;
  }
}

// asking user to make choice between giving options
async function authentication() {
  const authUser = await inquirer.prompt([
    {
      name: "authentication",
      type: "list",
      choices: [
        "Do you already have an account?",
        "Do want to create a new account?",
        "Exit",
      ],
    },
  ]);
  // if user has an account
  if (authUser.authentication === "Do you already have an account?") {
    await login();
  }
  // if user wants to make an account
  else if (authUser.authentication === "Do want to create a new account?") {
    // creating  new user
    await newUser();
    // if user wants to futher continue or not
    const conti = await inquirer.prompt([
      {
        name: "continue",
        type: "string",
        message: "Do you want to continue? y/n",
      },
    ]);
    if (conti.continue === "y" || conti.continue === "Y") {
      await login();
    } else {
      console.log("Have a nice day");
    }
  } else {
    console.log("Good bye");
    return;
  }
}
await authentication();
