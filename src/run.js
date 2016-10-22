var SubtitleGatewayOpensubtitles = require('./gateways/SubtitleGatewayOpensubtitles')
var HttpDownloadGatewayNode = require('./gateways/HttpDownloadGatewayNode')
var UncompressionGatewayNode = require('./gateways/UncompressionGatewayNode')
var TorrentGatewayPirateBay = require('./gateways/TorrentGatewayPirateBay')
var VLCTorrentPlayerGateway = require('./gateways/VLCTorrentPlayerGateway')
var FindAndPlayUsecase = require('./usecase/FindAndPlayUsecase')


var movieToFind = process.argv[2]
var subtitleLanguage = process.argv[3]

new FindAndPlayUsecase(
    new SubtitleGatewayOpensubtitles(),
    new HttpDownloadGatewayNode(),
    new UncompressionGatewayNode(),
    new TorrentGatewayPirateBay(),
    new VLCTorrentPlayerGateway()
).execute(movieToFind, subtitleLanguage)

