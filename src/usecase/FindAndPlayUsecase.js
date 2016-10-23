var path = require('path')


class FindAndPlayUsecase {

    constructor(subtitleGateway, downloadGateway, uncompressionGateway,
                torrentGateway, vlcTorrentPlayerGateway) {
        this.subtitleGateway = subtitleGateway
        this.downloadGateway = downloadGateway
        this.uncompressionGateway = uncompressionGateway
        this.torrentGateway = torrentGateway
        this.vlcTorrentPlayerGateway = vlcTorrentPlayerGateway
    }

    execute(movieToFind, subtitleLanguage) {
        return this.subtitleGateway.searchSubtitles(movieToFind, subtitleLanguage)
            .then((subtitles) => {
                var choosedSubtitle = subtitles[0]
                return this.downloadGateway.download(choosedSubtitle.link, '.')
                    .then((downloadedSubtitle) => {
                        let subtitleLocation = path.join(path.dirname(downloadedSubtitle), 'subtitle.srt')
                        return this.uncompressionGateway.uncompress(downloadedSubtitle, subtitleLocation)
                            .then(() => {
                                    return this.torrentGateway.searchTorrents(choosedSubtitle.name.replace('.srt', ''))
                                        .then((results) => {
                                            let firstResult = results[0]
                                            return this.vlcTorrentPlayerGateway.play(firstResult.magnetLink, subtitleLocation)
                                        })
                                }
                            )
                    })
            })
    }

}

module.exports = FindAndPlayUsecase
