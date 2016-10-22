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
        this.subtitleGateway.searchSubtitles(movieToFind, subtitleLanguage)
            .then((subtitles) => {
                var choosedSubtitle = subtitles[0]
                this.downloadGateway.download(choosedSubtitle.link, '.')
                    .then((downloadedSubtitle) => {
                        this.uncompressionGateway.uncompress(downloadedSubtitle, './subtitle.srt')
                            .then(() => {
                                    this.torrentGateway.search(choosedSubtitle.name)
                                        .then((results) => {
                                            let firstResult = results[0]
                                            this.vlcTorrentPlayerGateway.play(firstResult.magnetLink, './subtitle.srt')
                                        })
                                }
                            )
                    })
            }).catch((err) => {
            console.log(err)
        })

    }

}

module.exports = FindAndPlayUsecase
