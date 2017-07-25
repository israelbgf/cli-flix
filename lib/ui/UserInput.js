let yargs = require('yargs');
let inquirer = require('inquirer');

function parseCLIInput() {
    return yargs
        .detectLocale(false)
        .version()
        .usage('Usage: cli-flix --name "Nice Series s01e02" --language pob --keywords keyword1 keyword2')
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
            'k': {
                alias: 'keywords',
                default: [],
                describe: 'Keywords to highlight in the search result',
                type: 'array'
            },
        }).argv;
}

function askForWhichTorrentAndSubtitle(torrents, subtitles) {
    function validate(answer){
        return answer >= 0 && answer < torrents.length || "Invalid choice."
    }

    return Promise.all([inquirer.prompt([
        {
            type: 'input',
            name: 'torrentIndex',
            message: 'Which torrent to stream?',
            default: '0',
            filter: parseInt,
            validate,
        },
        {
            type: 'input',
            name: 'subtitleIndex',
            message: 'Which subtitle to use?',
            default: '0',
            filter: parseInt,
            validate
        }

    ]), torrents, subtitles]);
}

module.exports = {
    parseCLIInput,
    askForWhichTorrentAndSubtitle
}
