let it = require('mocha').it
let describe = require('mocha').describe
let assert = require('chai').assert
let core = require('./SuggestMatch')
let entity = require('./Entity')

describe('suggestMatch', function () {

    it('no match when there are no torrents', function () {
        assert.throws(() => core.suggestMatch([], [new entity.Subtitle({})], ['AnyKeyword']), core.NoMatchFoundError)
    })

    it('no match when there are no subtitles', function () {
        assert.throws(() => core.suggestMatch([new entity.Torrent({})], [], ['AnyKeyword']), core.NoMatchFoundError)
    })

    it('no match when keyword not found', function () {
        assert.throws(() => {
            core.suggestMatch(
                [
                    new entity.Torrent({name: 'NiceTorrent'}),
                    new entity.Torrent({name: 'BadTorrent'})
                ],
                [
                    new entity.Subtitle({movieName: 'NiceSubtitle'})
                ], ['Bad'])
        }, core.NoMatchFoundError)
    })

    it('no match when keywords are not defined', function () {
        assert.throws(() => {
            core.suggestMatch(
                [
                    new entity.Torrent({name: 'BadTorrent'})
                ],
                [
                    new entity.Subtitle({movieName: 'NiceSubtitle'})
                ], [])
        }, core.NoMatchFoundError)
    })

    it('match when there are only one torrent and subtitle', function () {
        let [torrent, subtitle] = core.suggestMatch(
            [new entity.Torrent({name: 'NiceTorrent'})],
            [new entity.Subtitle({movieName: 'NiceSubtitle'})], ['AnyKeyword'])

        assert.equal(torrent.name, 'NiceTorrent')
        assert.equal(subtitle.movieName, 'NiceSubtitle')
    })

    it('match when keyword found in both torrent and subtitle', function () {
        let [torrent, subtitle] = core.suggestMatch(
            [
                new entity.Torrent({name: 'NiceTorrent'}),
                new entity.Torrent({name: 'BadTorrent'})
            ],
            [
                new entity.Subtitle({movieName: 'NiceSubtitle'})
            ], ['Nice'])

        assert.equal(torrent.name, 'NiceTorrent')
        assert.equal(subtitle.movieName, 'NiceSubtitle')
    })

    it('get first match when multiples matches are found', function () {
        let [torrent, subtitle] = core.suggestMatch(
            [
                new entity.Torrent({name: 'BadTorrent'}),
                new entity.Torrent({name: 'NiceTorrent'}),
                new entity.Torrent({name: 'NiceTorrent-2'})
            ],
            [
                new entity.Subtitle({movieName: 'NiceSubtitle'}),
                new entity.Subtitle({movieName: 'NiceSubtitle-2'})
            ], ['Nice'])

        assert.equal(torrent.name, 'NiceTorrent')
        assert.equal(subtitle.movieName, 'NiceSubtitle')
    })


})

