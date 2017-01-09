const playerGateway = require('./TorrentStreamPlayerGatewayPeerflix')
const prepareOutputFolder = require("../../test/FixtureUtils.js").prepareOutputFolder;
const path = require('path')
const fs = require('fs-extra')

const subtitleName = 'sample_subtitle_(2016)_[720p,BluRay,x264,SHU-ES]_-_RELEASE.srt'
const sampleSubtitle = path.join(__dirname, '../../test/fixture/', subtitleName)
const testSubtitle = path.join('../../test/output', subtitleName)

const MANUAL_TEST_ENABLED = false

if (MANUAL_TEST_ENABLED){
    prepareOutputFolder()
    setUp()
    startStreamingTest()
}

function setUp() {
    fs.copySync(sampleSubtitle, testSubtitle)
}

function startStreamingTest() {
    playerGateway.startStreaming([
        'magnet:?xt=urn:btih:1b2456ab48a2fbf0b0052fb908f1a719f56c1ffc&dn=Seven+Samurai+aka+Shichinin+no+samurai+%281954%29+720p+BRRiP+x264+AA&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969',
        path.resolve(testSubtitle)])
}

