var yargs = require('yargs')
var inquirer = require('inquirer');

function parseCLIInput() {
    return yargs
        .detectLocale(false)
        .usage('Usage: $0 -name "Nice Series s01e02" -l pob -hl keyword1 keyword2')
        .options({
            'n': {
                alias: 'name',
                demand: true,
                describe: 'Name of the movie to search for',
                type: 'string'
            },
            'l': {
                alias: 'language',
                default: 'pob',
                describe: 'Language to search for subtitle',
                type: 'string'
            },
            'hl': {
                alias: 'highlight',
                default: ['x', 'z'],
                describe: 'Keywords to highlight in the search result',
                type: 'array'
            },
        }).argv;
}

function askForWhichTorrentAndSubtitle(torrents, subtitles) {
    return Promise.all([inquirer.prompt([
        {
            type: 'input',
            name: 'torrentIndex',
            message: 'Which torrent to stream?',
            default: '0',
            filter: parseInt,
            validate: answer => {
                return answer < torrents.length || "Invalid choice."
            },
        },
        {
            type: 'input',
            name: 'subtitleIndex',
            message: 'Which subtitle to use?',
            default: '0',
            filter: parseInt,
            validate: answer => {
                return answer < subtitles.length || "Invalid choice."
            },
        }

    ]), torrents, subtitles]);
}

module.exports = {
    parseCLIInput,
    askForWhichTorrentAndSubtitle
}
