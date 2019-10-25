'use strict';

const { probabilityUnion, probStayAlive, probRollStaysAlive, shouldRollAgain } = require('../players/probability');
const assert = require('chai').assert;

describe('Probability AI', function() {
    describe('#probabilityUnion()', function() {
        it('should return 0.5 for (0.5, 1, 1)', function() {
            assert.equal(probabilityUnion(0.5, 1, 1), 0.5);
        });
        it('should return 0.25 for (0.5, 2, 1)', function() {
            assert.equal(probabilityUnion(0.5, 2, 1), 0.25);
        });
        it('should return 0.4375 for (0.5, 2, 2)', function() {
            assert.equal(probabilityUnion(0.5, 2, 2), 0.4375);
        });
    });
    describe('#probStayAlive()', function() {
        it('should return 0.5 for (54, 1, 1)', function() {
            assert.equal(probStayAlive(54, 1, 1), 0.5);
        });
        it('should return 0.25 for (54, 2, 1)', function() {
            assert.equal(probStayAlive(54, 2, 1), 0.25);
        });
        it('should return 0.4375 for (54, 2, 2)', function() {
            assert.equal(probStayAlive(54, 2, 2), 0.4375);
        });
        it('should return ~0.8333 for (22, 1, 1)', function() {
            assert.approximately(probStayAlive(22, 1, 1), 0.833, 0.001);
        });
    });
    describe("#probRollStaysAlive()", function() {
        it('should return 0.5 for (54, 1, 1, 999)', function() {
            assert.equal(probRollStaysAlive(54, 1, 1, 999), 0.5);
        });
        it('should return 0.25 for (54, 2, 1, 999)', function() {
            assert.equal(probRollStaysAlive(54, 2, 1, 999), 0.25);
        });
        it('should return 0.4375 for (54, 2, 2)', function() {
            assert.equal(probRollStaysAlive(54, 2, 2), 0.4375);
        });
        it('should return 0 for (42, 2, 0, 43)', function() {
            assert.equal(probRollStaysAlive(42, 2, 0, 43), 0);
        });
        it('should return 1 for (42, 2, 4, 31)', function() {
            assert.equal(probRollStaysAlive(42, 2, 4, 31), 1);
        });
    });
    describe("#shouldRollAgain()", function() {
        it('should return false for (54, 3, 3, 3)', function() {
            assert.equal(shouldRollAgain(54, 3, 3, 3), false);
        });
        it('should return false for (21, 3, 3, 1)', function() {
            assert.equal(shouldRollAgain(21, 3, 3, 1), false);
        });
        it('should return false for (54, 3, 3, 3)', function() {
            assert.equal(shouldRollAgain(54, 3, 3, 1, 41), false);
        });
        it('should return false for (54, 1, 3, 1)', function() {
            assert.equal(shouldRollAgain(54, 1, 3, 1), false);
        });
        it('should return true for (41, 1, 3, 1)', function() {
            assert.equal(shouldRollAgain(41, 1, 3, 1), true);
        });
    })
});