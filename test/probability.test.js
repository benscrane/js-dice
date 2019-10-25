'use strict';

const { probabilityUnion } = require('../players/probability');
const assert = require('assert');

// Probability
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
});