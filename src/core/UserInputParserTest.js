var userInput = require('./UserInputParser.js');
var it = require('mocha').it
var describe = require('mocha').describe
var assert = require('chai').assert


describe('validateChoice', function () {

    it('is false for invalid input', function () {
        assert.isFalse(userInput.validateChoice('x', 0, 0))
    })

    it('is false when choosed torrent is greater than the number of torrents', function () {
        assert.isFalse(userInput.validateChoice('2.0', 1, 1))
    })

    it('is false when choosed subtitle is greater than the number of subtitles', function () {
        assert.isFalse(userInput.validateChoice('0.2', 1, 1))
    })

    it('is false when number of torrents is 0', function () {
        assert.isFalse(userInput.validateChoice('0.0', 0, 1))
    })

    it('is false when number of subtitles is 0', function () {
        assert.isFalse(userInput.validateChoice('0.0', 1, 0))
    })

    it('is true when choosed torrent and subtitle are is lesser than the number of torrents and subtitles', function () {
        assert.isTrue(userInput.validateChoice('0.0', 1, 1))
    })

    it('is true when choosed torrent and subtitle are is equal than the number of torrents and subtitles', function () {
        assert.isTrue(userInput.validateChoice('1.1', 1, 1))
    })

})

