"use strict";

const { 
    seedLives,
    seedRolls,
    isGameOver,
    rollDice,
    getHighestRoll,
    getLowestRoll,
    numPlayersLeft
} = require('../lib/game');
const { RANKED_LIST } = require('../lib/probHelpers');
const assert = require('chai').assert;

describe('Game', function() {
    describe('#seedLives()', function() {
        it('should return array of correct length', function() {
            assert.lengthOf(seedLives(["a", "b", "c"]), 3);
        });
    });
    describe("#seedRolls()", function() {
        it('should return array of correct length', function() {
            assert.lengthOf(seedRolls(["a", "b", "c", "d"]), 4);
        });
    });
    describe("#isGameOver()", function() {
        it('should return true for ([0, 0, 0, 2])', function() {
            assert.equal(isGameOver([0, 0, 0, 1]), true);
        });
        it('should return false for [0, 1, 0, 0, 3]', function() {
            assert.equal(isGameOver([0, 1, 0, 0, 3]), false);
        });
    });
    describe("#rollDice()", function() {
        it('should be a valid roll', function() {
            assert.oneOf(rollDice(), RANKED_LIST);
        });
    });
    describe("#getHighestRoll()", function() {
        it('should return 21 from [32, 54, 21, 22]', function() {
            assert.equal(getHighestRoll([32, 54, 21, 22]), 21);
        });
    });
    describe("#getLowestRoll()", function() {
        it('should return 32 from [32, 54, 21, 22]', function() {
            assert.equal(getLowestRoll([32, 54, 21, 22]), 32);
        });
    });
    describe("#numPlayersLeft()", function() {
        it('should return 2', function() {
            let lives = [3, 2, 2, 2];
            let rolls = [null, null, 31, null];
            assert.equal(numPlayersLeft(lives, rolls), 2);
        });
        it('should return 0', function() {
            let lives = [3, 0, 2, 0];
            let rolls = [null, null, 31, null];
            assert.equal(numPlayersLeft(lives, rolls), 0);
        });
    });
});