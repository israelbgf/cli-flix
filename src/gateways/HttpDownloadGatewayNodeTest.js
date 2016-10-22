var it = require('mocha').it
var describe = require('mocha').describe
var HttpDownloadGatewayNode = require('./HttpDownloadGatewayNode')
var fs = require('fs')
var path = require('path')
var assert = require('chai').assert

describe('HttpDownloadGatewayNode', function () {

    it('should return download file from internet', function () {
        let fileToDownload = 'robots.txt'
        let dirToReceiveDownload = 'test/output'

        return new HttpDownloadGatewayNode().download(`http://www.google.com/${fileToDownload}`, dirToReceiveDownload)
            .then((downloadedFileLocation) => {
                let expectedFileLocation = path.join(dirToReceiveDownload, fileToDownload)
                assert.equal(downloadedFileLocation, expectedFileLocation)
                let content = fs.readFileSync(downloadedFileLocation, 'utf8')
                assert.include(content, 'User-agent:')
            })
    })
})

