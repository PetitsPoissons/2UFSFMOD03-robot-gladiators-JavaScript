// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth;
var playerAttack;
var playerMoney;

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = randomNumber(40, 60);
var enemyAttack = 12;

var fight = function (enemyName) {
	// Repeat and execute as long as the enemy-robot is alive
	while (playerHealth > 0 && enemyHealth > 0) {
		// Ask player whether they want to fight or skip the battle
		var promptFight = window.prompt(
			"Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
		);

		// If player picks "skip" confirm and then stop the loop
		if (promptFight === 'skip' || promptFight === 'SKIP') {
			// Confirm player wants to skip
			var confirmSkip = window.confirm("Are you sure you'd like to quit?");

			// if yes (true), leave fight
			if (confirmSkip) {
				window.alert(playerName + ' has decided to skip this fight. Goodbye!');
				// Subtract money from playerMoney for skipping
				playerMoney = Math.max(0, playerMoney - 10);
				console.log('playerMoney', playerMoney);
				break;
			}
		}

		// Generate random damage value based on player's attack power
		var damage = randomNumber(playerAttack - 3, playerAttack);
		enemyHealth = Math.max(0, enemyHealth - damage);

		// Log a resulting message to the console so we know that it worked.
		console.log(
			playerName +
				' attacked ' +
				enemyName +
				'. ' +
				enemyName +
				' now has ' +
				enemyHealth +
				' health remaining.'
		);

		// Check enemy's health
		if (enemyHealth <= 0) {
			window.alert(enemyName + ' has died!');
			// Award player money for winning
			playerMoney = playerMoney + 20;
			// Leave while() loop since enemy is dead
			break;
		} else {
			window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
		}

		// Generate random damage value based on enemy's attack power
		var damage = randomNumber(enemyAttack - 3, enemyAttack);
		playerHealth = Math.max(0, playerHealth - damage);

		// Log a resulting message to the console so we know that it worked.
		console.log(
			enemyName +
				' attacked ' +
				playerName +
				'. ' +
				playerName +
				' now has ' +
				playerHealth +
				' health remaining.'
		);

		// Check player's health
		if (playerHealth <= 0) {
			window.alert(playerName + ' has died!');
			// Leave while() loop if player is dead
			break;
		} else {
			window.alert(playerName + ' still has ' + playerHealth + ' health left.');
		}
	}
};

// Function to start a new game
var startGame = function () {
	// Reset player stats
	playerHealth = 100;
	playerAttack = 20;
	playerMoney = 10;
	for (var i = 0; i < enemyNames.length; i++) {
		if (playerHealth > 0) {
			// Let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
			window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
			// Pick new enemy to fight based on the index of the enemyNames array
			var pickedEnemyName = enemyNames[i];
			// Reset enemyHealth before starting new fight
			enemyHealth = randomNumber(40, 60);
			// Use debugger to pause script from running and check what's going on at that moment in the code
			// debugger;
			// Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
			fight(pickedEnemyName);
			// If player is still alive and we're not at the last enemy in the array
			if (playerHealth > 0 && i < enemyNames.length - 1) {
				// Ask if player wants to shop before next round
				var storeConfirm = window.confirm(
					'The fight is over, visit the store before the next round?'
				);
				if (storeConfirm) {
					shop();
				}
			}
		} else {
			window.alert('You have lost your robot in battle! Game over!');
			break;
		}
	}
	// After the loop ends, player is either out of health or enemies to fight, so run the endGame function
	endGame();
};

// Function to end the entire game
var endGame = function () {
	window.alert("The game has now ended. Let's see how you did!");
	// If player is still alive, player wins
	if (playerHealth > 0) {
		window.alert(
			"Great job, you've survived the game! You now have a score of " +
				playerMoney +
				'.'
		);
	} else {
		window.alert("You've lost your robot in battler.");
	}
	// Ask player is they'd like to play again
	var playAgainConfirm = window.confirm('Would you like to play again?');
	if (playAgainConfirm) {
		startGame();
	} else {
		window.alert('Thank you for playing Robot Gladiators! Come back soon!');
	}
};

// Function to let the player shop
var shop = function () {
	// Ask player what they'd like to do
	var shopOptionPrompt = window.prompt(
		"Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
	);
	switch (shopOptionPrompt) {
		case 'REFILL':
		case 'refill':
			if (playerMoney >= 7) {
				window.alert("Refilling player's health by 20 for 7 dollars.");
				playerHealth += 20;
				playerMoney -= 7;
			} else {
				window.alert("You don't have enough money!");
			}
			break;
		case 'UPGRADE':
		case 'upgrade':
			if (playerMoney >= 7) {
				window.alert("Upgrading player's attack by 6 for 7 dollars.");
				playerAttack += 6;
				playerMoney -= 7;
			} else {
				window.alert("You don't have enough money!");
			}
			break;
		case 'LEAVE':
		case 'leave':
			window.alert('Leaving the store.');
			break;
		default:
			window.alert('You did not pick a valid option. Try again.');
			shop();
			break;
	}
};

// Function to generate a random numeric value
var randomNumber = function (min, max) {
	var value = Math.floor(Math.random() * (max - min + 1)) + min; // value randomly picked between 40 and 60
	return value;
};

// Start the game when the page loads
startGame();
