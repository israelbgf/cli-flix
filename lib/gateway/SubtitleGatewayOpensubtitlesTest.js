var it = require('mocha').it
var describe = require('mocha').describe
var subtitleGateway = require('./SubtitleGatewayOpensubtitles')
var assert = require('chai').assert
var fs = require('fs')
var fixtures = require('../../test/FixtureUtils')

describe('SubtitleGatewayOpensubtitles', function () {
    this.timeout(10000);

    beforeEach(() => {
        fixtures.prepareOutputFolder()
    });

    it('should return subtitles from OpenSubtitles', function () {
        return subtitleGateway.fetchSubtitles('shichi nin no samurai 1954', 'pob')
            .then((results) => {
                assert.isAbove(results.length, 1)
                let result = results[0]
                console.log(result)

                assert.equal(result.subtitleName, 'Shichinin Samurai CD1.sub')
                assert.equal(result.movieName, 'Shichinin no samurai (1954)')
                assert.include(result.downloadLink, "http://dl.opensubtitles.org/en/download")
            })
    })

    it('should download and uncompress subtitle', function () {
        let output = 'test/output/'

        return subtitleGateway.fetchSubtitles('shichinin no samurai 1954')
            .then(results => {
                assert.isAtLeast(results.length, 1);
                return subtitleGateway.downloadSubtitle(results[0], output)
            })
            .then(downloadedSubtitle => {
                let content = fs.readFileSync(downloadedSubtitle, "utf8")
                assert.include(content, 'TOHO CO.')
            })
    })


})
