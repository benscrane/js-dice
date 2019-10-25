"use strict";

const { seedLives } = require('../lib/game');
const assert = require('chai').assert;

describe('Game', function() {
    describe('#seedLives()', function() {
        it('should return array of correct length', function() {
            assert.equal(seedLives(["a", "b", "c"]).length, 3);
        })
    })
})