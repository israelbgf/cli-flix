var it = require('mocha').it
var describe = require('mocha').describe
var beforeEach = require('mocha').beforeEach;
var fs = require('fs')
var path = require('path')
var assert = require('chai').assert

var fixtures = require('../../test/FixtureUtils')
var UncompressionGatewayNode = require('./UncompressionGatewayNode')


describe('UncompressionGatewayNode', function () {

    beforeEach(() => {
        fixtures.prepareOutputFolder()
    });

    it('should return uncompress .gz file', function () {
        let input = 'test/fixture/hello.txt.gz'
        let output = 'test/output/hello.txt'

        return new UncompressionGatewayNode().uncompress(input, output)
            .then(() => {
                let content = fs.readFileSync(output, 'utf8')
                assert.equal(content, 'Hello World!\n')
            })
    })
})

