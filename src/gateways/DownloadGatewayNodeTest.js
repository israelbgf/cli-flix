var it = require('mocha').it
var describe = require('mocha').describe
var beforeEach = require('mocha').beforeEach
var fs = require('fs')
var path = require('path')
var assert = require('chai').assert

var fixtures = require('../../test/FixtureUtils.js')
var downloadGatewayNode = require('./DownloadGatewayNode')


describe('HttpDownloadGatewayNode', function () {

    beforeEach(() => {
        fixtures.prepareOutputFolder()
    })

    it('should return download file from internet', function () {
        let fileToDownload = 'robots.txt'
        let dirToReceiveDownload = 'test/output'

        return downloadGatewayNode.download(`http://www.google.com/${fileToDownload}`, dirToReceiveDownload)
            .then((downloadedFileLocation) => {
                let expectedFileLocation = path.resolve(path.join(dirToReceiveDownload, fileToDownload))
                assert.equal(downloadedFileLocation, expectedFileLocation)
                let content = fs.readFileSync(downloadedFileLocation, 'utf8')
                assert.include(content, 'User-agent:')
            })
    })
})

