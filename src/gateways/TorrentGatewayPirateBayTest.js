var it = require('mocha').it
var describe = require('mocha').describe
var assert = require('chai').assert

var TorrentGateway = require('./TorrentGatewayPirateBay')


describe('TorrentGatewayPirateBay', function () {
    this.timeout(10000)

    it('should return torrents ordered by seeds when search is done', function () {
        return TorrentGateway.fetchTorrents('shichinin no samurai 1954')
            .then((results) => {
                assert.isAtLeast(results.length, 2);
                let firstResult = results[0];
                let secondResult = results[1];
                console.log(firstResult)

                assert.match(firstResult.name, /shichinin/ig)
                assert.match(firstResult.seeders, /^\d+$/)
                assert.match(firstResult.leechers, /^\d+$/)
                assert.match(firstResult.magnetLink, /magnet:?/ig)
                assert.match(firstResult.size, /Gib:?/ig)
                assert.isAbove(firstResult.seeders, secondResult.seeders)
            })
    })
})
