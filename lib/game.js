function seedLives(players) {
    let lives = [];
    for (let i = 0; i < players.length; i++) {
        lives.push(3);
    }
    return lives;
};

function rollDice() {
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    return Number([dice1, dice2].sort((a, b) => b - a).join(""));
};

// function for the union of probabilities
// P(A or B) = P(A) + P(B) - P(A and B)
function probabilityUnion(prob, numRolls, numPlayers) {
    if (numPlayers === 1) {
        return Math.pow(prob, numRolls);
    } else {
        return Math.pow(prob, numRolls) + probabilityUnion(prob, numRolls, numPlayers - 1) - (Math.pow(prob, numRolls) * probabilityUnion(prob, numRolls, numPlayers -1));
    }
}

const RANKED_LIST = [
    31, 32, 41, 42, 43, 51, 52, 53, 54, 61, 62, 63, 64, 65, 11, 22, 33, 44, 55, 66, 21
];

module.exports = {
    probabilityUnion,
    rollDice,
    seedLives,
    RANKED_LIST
}