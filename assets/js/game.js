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
var enemyHealth = 50;
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
				playerMoney = playerMoney - 10;
				console.log('playerMoney', playerMoney);
				break;
			}
		}

		//Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
		enemyHealth = enemyHealth - playerAttack;

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

		// Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
		playerHealth = playerHealth - enemyAttack;

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
			enemyHealth = 50;
			// Use debugger to pause script from running and check what's going on at that moment in the code
			// debugger;
			// Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
			fight(pickedEnemyName);
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

// Start the game when the page loads
startGame();
