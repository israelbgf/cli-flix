var it = require('mocha').it
var describe = require('mocha').describe
var assert = require('chai').assert
var expect = require('chai').expect
var formatter = require('./UserOutput')
var entity = require('./../core/Entity')


describe('formatTorrent', function () {

    it('formats a torrent name with right padding', function () {
        let result = formatter.formatTorrentName(new entity.Torrent({
            name: 'A.Nice.Episode.S07E02.WEB-DL.x264-FUM[ettv]',
        }))

        expect(result).to.equal('A.Nice.Episode.S07E02.WEB-DL.x264-FUM[ettv]                 ')
    })

    it('formats a torrent size with left padding', function () {
        let result = formatter.formatTorrentSize(new entity.Torrent({
            size: '60.38 MiB',
        }))

        expect(result).to.equal(' 60.38 MiB')
    })

    it('formats a torrent seeders with right padding', function () {
        let result = formatter.formatTorrentSeeders(new entity.Torrent({
            seeders: '4696',
        }))

        expect(result).to.equal('S:4696  ')
    })

    it('formats a torrent leechers with right padding', function () {
        let result = formatter.formatTorrentLeechers(new entity.Torrent({
            leechers: '4696',
        }))

        expect(result).to.equal('L:4696  ')
    })


    it('returns a fully formatted torrent', function () {
        let result1 = formatter.formatTorrent(new entity.Torrent({
            name: 'A.Nice.Episode.S07E02.WEB-DL.x264-FUM[ettv]',
            seeders: '16853',
            leechers: '3646',
            size: '600.38 MiB'
        }), 1)
        let result2 = formatter.formatTorrent(new entity.Torrent({
            name: 'A.Nice.Episode.S07E02.1080p.WEB-DL.x264-FUM[ettv]',
            seeders: '4696',
            leechers: '1191',
            size: '1.82 GiB'
        }), 2)

        assert.equal(result1, '1. A.Nice.Episode.S07E02.WEB-DL.x264-FUM[ettv]                  600.38 MiB S:16853  L:3646  ')
        assert.equal(result2, '2. A.Nice.Episode.S07E02.1080p.WEB-DL.x264-FUM[ettv]              1.82 GiB S:4696   L:1191  ')
    })
})

describe('formatSubtitle', function () {

    it('formats a subtitle', function () {
        let result = formatter.formatSubtitle(new entity.Subtitle({
            movieName: 'A Nice Episode',
            subtitleName: 'A.Nice.Episode.S07E02.WEB-DL.x264-FUM[ettv].srt',
        }), 1)

        expect(result).to.equal(
            '1. A Nice Episode\n' +
            '   A.Nice.Episode.S07E02.WEB-DL.x264-FUM[ettv].srt')
    })

})

describe('highlightMatches', function () {

    it('do not match when keyword is not found in both lists', function () {
        let [firstArray, secondArray] = formatter.highlightMatches(
            ['foo', 'foo'],
            ['bar', 'bar'],
            ['keyword']
        )

        expect(firstArray).to.eql(['foo', 'foo'])
        expect(secondArray).to.eql(['bar', 'bar'])
    })

    it('do not match when keyword is found in ONLY one list', function () {
        let [firstArray, secondArray] = formatter.highlightMatches(
            ['keyword'],
            ['bar'],
            ['keyword']
        )

        expect(firstArray).to.eql(['keyword'])
        expect(secondArray).to.eql(['bar'])
    })

    it('highlight match when keyword is found in both lists', function () {
        let [firstArray, secondArray] = formatter.highlightMatches(
            ['fookeywordbar'],
            ['barkeywordfoo'],
            ['keyword'],
            (text) => "(" + text + ")"
        )

        expect(firstArray).to.eql(['foo(keyword)bar'])
        expect(secondArray).to.eql(['bar(keyword)foo'])
    })

    it('highlight multiples keywords when its found in both lists', function () {
        let [firstArray, secondArray] = formatter.highlightMatches(
            ['fookeyword1bar', '--keyword2--'],
            ['barkeyword1foo', 'x-keyword2-x'],
            ['keyword1', 'keyword2'],
            (text) => "(" + text + ")"
        )

        expect(firstArray).to.eql(['foo(keyword1)bar', '--(keyword2)--'])
        expect(secondArray).to.eql(['bar(keyword1)foo', 'x-(keyword2)-x'])
    })

})

