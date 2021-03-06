"use strict";

const { RANKED_LIST, PROBABILITIES, CUMULATIVE_PROBS } = require('../lib/probHelpers');

/**
 * Computes the probability of the event happening, rolling 
 * less than or equal to our roll
 * P(A or B) = P(A) + P(B) - P(A and B)
 * @param {Number} prob - probability of the event
 * @param {Number} numRolls - number of rolls allowed per player
 * @param {Number} numPlayers - number of players left to go
 * @returns {Number} - probability that event will occur
 */
function probabilityUnion(prob, numRolls, numPlayers) {
    if (numPlayers === 1) {
        return Math.pow(prob, numRolls);
    } else {
        return Math.pow(prob, numRolls) + probabilityUnion(prob, numRolls, numPlayers - 1) - (Math.pow(prob, numRolls) * probabilityUnion(prob, numRolls, numPlayers -1));
    }
}

/**
 * Returns the probability that a given roll stays alive (at least ties)
 * Doesn't take existing low roll into account
 * @param {Number} roll - the roll value in question
 * @param {Number} numRolls - number of rolls allowed per player
 * @param {Number} numPlayers - number of players left to go
 * @returns {Number} - probability that the given roll stays alive
 */
function probStayAlive(roll, numRolls, numPlayers) {
    const index = RANKED_LIST.indexOf(roll);
    const prob = CUMULATIVE_PROBS[index] / 36;
    return probabilityUnion(prob, numRolls, numPlayers);
}

/**
 * Returns the probability that a given roll stays alive (at least ties)
 * Takes existing low roll into account
 * @param {Number} roll - the roll value in question
 * @param {Number} numRolls - number of rolls allowed per player
 * @param {Number} numPlayers - number of players left to go
 * @param {Number} lowRoll - current lowest roll
 * @returns {Number} - probability that the given roll stays alive
 */
function probRollStaysAlive(roll, numRolls, numPlayers, lowRoll = 999) {
    if (RANKED_LIST.indexOf(roll) >= RANKED_LIST.indexOf(lowRoll) && RANKED_LIST.indexOf(lowRoll) != -1) {
        return 1;
    } else if (numPlayers == 0){
        return 0;
    } else {
        return probStayAlive(roll, numRolls, numPlayers);
    }
}

/**
 * 
 * @param {Number} roll - number just rolled by current player
 * @param {Number} numRolls - number of allowed rolls
 * @param {Number} numPlayers - number of players left after current player
 * @param {Number} rollNum - current roll of current player (1, 2, or 3)
 * @param {Number} lowRoll - current lowest established roll (default to 999 if no low roll established (player is first))
 * @returns {Boolean} - whether or not to roll again
 */
function shouldRollAgain(roll, numRolls, numPlayers, rollNum, lowRoll = 999) {
    if (rollNum >= 3 || (rollNum >= numRolls && lowRoll != 999)) return false;     //maximum rolls reached
    let currentProb = probRollStaysAlive(roll, numRolls, numPlayers, lowRoll);
    let newNumRolls = lowRoll == 999 ? numRolls + 1 : numRolls;
    let nextCumulProb = 0;
    for (let i = 0; i < RANKED_LIST.length; i++) {
        nextCumulProb += probRollStaysAlive(RANKED_LIST[i], newNumRolls, numPlayers, lowRoll) * PROBABILITIES[i];
    }
    let nextProb = nextCumulProb / 36;
    if (currentProb >= nextProb) {
        return false;
    } else {
        return true;
    }
}

module.exports = {
    probabilityUnion,
    probStayAlive,
    probRollStaysAlive,
    shouldRollAgain
}