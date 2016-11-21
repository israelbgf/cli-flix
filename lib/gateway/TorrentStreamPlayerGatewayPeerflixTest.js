var playerGateway = require('./TorrentStreamPlayerGatewayPeerflix')
var path = require('path');

const MANUAL_TEST_ENABLED = false

if (MANUAL_TEST_ENABLED)
    playerGateway.startStreaming([
        'magnet:?xt=urn:btih:1b2456ab48a2fbf0b0052fb908f1a719f56c1ffc&dn=Seven+Samurai+aka+Shichinin+no+samurai+%281954%29+720p+BRRiP+x264+AA&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969',
        path.resolve(path.join(__dirname, '../../test/fixture/sample_subtitle_(2016)_[720p,BluRay,x264,SHU-ES]_-_RELEASE.srt'))])
