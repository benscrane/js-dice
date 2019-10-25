"use strict";

const { seedLives } = require('../lib/game');
const assert = require('chai').assert;

describe('Game', function() {
    describe('#seedLives()', function() {
        it('should return array of correct length', function() {
            assert.lengthOf(seedLives(["a", "b", "c"]), 3);
        })
    })
})