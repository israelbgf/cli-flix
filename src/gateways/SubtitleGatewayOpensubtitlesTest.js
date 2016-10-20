var it = require('mocha').it
var describe = require('mocha').describe
var SubtitleGatewayOpensubtitles = require('./SubtitleGatewayOpensubtitles')
var assert = require('chai').assert

describe('SubtitleGatewayOpensubtitles', function () {
    this.timeout(5000);

    it('should return subtitles', function () {
        return new SubtitleGatewayOpensubtitles().searchSubtitles('shichi nin no samurai 1954', 'pob')
            .then((results) => {
                let result = results[0]
                assert.equal(result.name, 'Shichinin Samurai CD1.sub')
                assert.include(result.link, "http://dl.opensubtitles.org/en/download")
                assert.include(result.languageName, 'Portuguese')
                assert.match(result.downloadCount, /^\d+$/)
                assert.equal(result.seriesSeason, '0')
                assert.equal(result.seriesEpisode, '0')
                assert.equal(result.userRank, 'bronze member')
            })
    })
})
