# cli-flix

Stream torrents to your VLC player with subtitles easily from the command prompt

![image](https://cloud.githubusercontent.com/assets/771129/20242941/7952cbfe-a928-11e6-98e8-96b4665702e9.png)

## usage
```sh
npm install -g cli-flix
cli-flix --name "Nice Movie" --lang pob --keywords "RELEASE1" "RELEASE2"
```

The keywords are used to figure the best match between Movie/Subtitle.

## pre-requisites

- Node version of 6+.
- VLC installed.
- Windows users must have Git installed or it will fail when you try to install `cli-flix` with `npm`