let inquirer = require("inquirer");
let counter = 0;
let gameCounter = 0;
let players = [];
let teamsScore = 0;

let Player = function (name, position, offence, defence) {
    this.name = name;
    this.position = position;
    this.offence = offence;
    this.defence = defence;

    this.GoodGame = function () {
        if (Math.floor(Math.random() * 2) === 1) {
            this.offence++;
            if (this.offence > 10) {
                this.offence = 10;
            }
        } else {
            this.defence++;
            if (this.defence > 10) {
                this.defence = 10;
            }
        }
    };

    this.BadGame = function () {
        if (Math.floor(Math.random() * 2) === 1) {
            this.offence--;
            if (this.offence < 1) {
                this.offence = 1;
            }
        } else {
            this.defence--;
            if (this.defence < 1) {
                this.defence = 1;
            }
        }
    };

    this.PrintStats = function () {
        console.log("Name: " + this.name);
        console.log("Position: " + this.position);
        console.log("Offence: " + this.offence);
        console.log("Defence: " + this.defence);
    };
}

function PrintPlayerStats() {
    players.forEach(player => {
        if (player.position === 'starter') {
            player.PrintStats();
        }
    });
}

function Sub() {
    inquirer.prompt([
        {
            name: "sub",
            message: "Do you want to sub?"
        },
        {
            name: "name",
            message: "Which player do you want to sub?"
        }
    ]).then(function (answers) {
        if (answers.sub.toLowerCase() === 'yes') {
            players.forEach(player => {
                if (player.position === "sub") {
                    player.position = "starter";
                }
                if (player.name === answers.name.toLowerCase()) {
                    player.position = 'sub';
                }
            });
        }
        PlayGame();
    });
}
function PlayAgain(){
    inquirer.prompt([
        {name:"again",
        message:"Play Again?"}
    ]).then(function(answers){
        if(answers.again.toLowerCase() === "yes"){
            gameCounter = 0;
            PlayGame();
        } else {
            PrintPlayerStats();
            return;
        }
    });
}```




```function PlayGame() {
    //console.log("Playing Game: " + gameCounter);
    if (gameCounter < 5) {
        let opOffence = Math.floor(Math.random() * 20) + 1;
        let opDefence = Math.floor(Math.random() * 20) + 1;

        let teamsOff = 0;
        let teamsDef = 0;
        players.forEach(player => {
            if (player.position === 'starter') {
                teamsOff += player.offence;
                teamsDef += player.defence;
            }
        });
        //console.log("Offence: " + teamsOff + " - " + opOffence)
        //console.log("Defence: " + teamsDef + " - " + opDefence)
        if (teamsOff > opOffence) {
            teamsScore++;
            console.log(teamsScore);
        }

        if (teamsDef < opDefence) {
            teamsScore--;
            console.log(teamsScore);
        }

        gameCounter++;
        Sub();
    } else {
        if (teamsScore > 0) {
            players.forEach(player => {
                if (player.position === 'starter') {
                    player.GoodGame();
                }
            });
            console.log("You have Won: " + teamsScore);
            PrintPlayerStats();

        } else if (teamsScore < 0) {
            players.forEach(player => {
                if (player.position === 'starter') {
                    player.BadGame();
                }
            });
            console.log("You have lost: " + teamsScore);
        } else {
            console.log("Tie");
        }
        PlayAgain();
    }
}

function CreatePlayer() {
    if (counter < 3) {
        inquirer.prompt([
            {
                name: "name",
                message: "What is the players name? "
            },
            {
                name: "position",
                message: "What is the players position? "
            },
            {
                name: "offence",
                message: "What is the players offence? "
            },
            {
                name: "defence",
                message: "What is the players defence? "
            }
        ]).then(function (answers) {
            let newPlayer = new Player(answers.name.toLowerCase(), answers.position.toLowerCase(), parseInt(answers.offence), parseInt(answers.defence));
            players.push(newPlayer);
            counter++;
            CreatePlayer();
        });
    } else {
        PrintPlayerStats();
        PlayGame();
    }
}

CreatePlayer();