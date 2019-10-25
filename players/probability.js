"use strict";

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
    let currentProb = probRollStays(roll, numRolls, numPlayers, lowRoll);
    let newNumRolls = lowRoll == 999 ? numRolls + 1 : numRolls;
    let nextCumulProb = 0;
    for (let i = 0; i < RANKED_LIST.length; i++) {
        nextCumulProb += probRollStays(RANKED_LIST[i], newNumRolls, numPlayers, lowRoll) * PROBABILITIES[i];
    }
    let nextProb = nextCumulProb / 36;
    if (currentProb >= nextProb) {
        return false;
    } else {
        return true;
    }
}