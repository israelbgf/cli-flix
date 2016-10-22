var it = require('mocha').it
var describe = require('mocha').describe
var fs = require('fs')
var path = require('path')

var VLCTorrentPlayerGateway = require('./VLCTorrentPlayerGateway')

const IGNORE = false
if(IGNORE)
    it = it.skip

describe('VLCTorrentPlayerGateway', function () {
    this.timeout(10000)

    it('should stream torrent to vlc', function () {
        new VLCTorrentPlayerGateway().play('magnet:?xt=urn:btih:1b2456ab48a2fbf0b0052fb908f1a719f56c1ffc&dn=Seven+Samurai+aka+Shichinin+no+samurai+%281954%29+720p+BRRiP+x264+AA&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969', 'doesntmatter.srt')
    })
})

