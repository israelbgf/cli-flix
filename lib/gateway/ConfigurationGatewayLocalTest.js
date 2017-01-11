const it = require('mocha').it
const describe = require('mocha').describe
const beforeEach = require('mocha').beforeEach
const assert = require('chai').assert
const fixtures = require('../../test/FixtureUtils.js')
const configurationGateway = require('./ConfigurationGatewayLocal')


describe('ConfigurationGatewayLocal', function () {

    beforeEach(() => {
        fixtures.prepareOutputFolder()
    })

    it('should return an empty list of keywords if file do not exist', function () {
        let config = configurationGateway.getConfig(fixtures.getFile('i-do-not-exists'))

        assert.deepEqual(config.defaultKeywords, [])
    })

    it('should return an empty list of keywords if config is empty', function () {
        let config = configurationGateway.getConfig(fixtures.getFile('empty-cli-flix-config'))

        assert.deepEqual(config.defaultKeywords, [])
    })

    it('should return an list of keywords', function () {
        let config = configurationGateway.getConfig(fixtures.getFile('sample-cli-flix-config'))

        assert.deepEqual(config.defaultKeywords, ['abc1', 'abc2'])
    })

    it('should raise an usefull error message when json is invalid', function () {
        assert.throws(() => {
            configurationGateway.getConfig(fixtures.getFile('invalid-cli-flix-config'))
        }, Error, 'Invalid cli-fix config file: Unexpected number in JSON at position 21')
    })
})
