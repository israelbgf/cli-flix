var it = require('mocha').it
var describe = require('mocha').describe
var assert = require('chai').assert

var TorrentGatewayPirateBay = require('./TorrentGatewayPirateBay')


describe('TorrentGatewayPirateBay', function () {
    this.timeout(5000)

    it('should return torrents ordered by seeds when search is done', function () {
        return new TorrentGatewayPirateBay().searchTorrents('shichinin no samurai 1954')
            .then((results) => {
                assert.isAtLeast(results.length, 2);
                let result = results[0];
                console.log(result)

                assert.match(result.name, /shichinin/ig)
                assert.match(result.seeders, /^\d+$/)
                assert.match(result.leechers, /^\d+$/)
                assert.match(result.magnetLink, /magnet:?/ig)
                assert.match(result.size, /Gib:?/ig)
                assert.isAbove(result.seeders, results[1].seeders)
            })
    })
})
