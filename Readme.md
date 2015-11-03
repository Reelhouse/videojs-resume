# VideoJS Resume

A VideoJS plugin to resume playback of a video at the point in time it was left.

## Usage

Include `videojs-resume.min.css` and `videojs-resume.min.js`.

```js
  var player = videojs('example-video');
  player.Resume({
    uuid: 'UNIQUE_VIDEO_IDENTIFIER',
    playbackOffset: 5 // begin playing video this number of seconds before it otherwise would.
  });
```

## License

Licesned MIT. See LICENSE file.
