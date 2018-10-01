# Labeled Annotation Track for HiGlass

> An annotation track with a beautiful white outline and a carefully crafted text label that will make your gorgeous annotations shine!

[![higlass](https://img.shields.io/badge/higlass-💅-red.svg?colorB=ee82ee)](http://higlass.io)
[![npm version](https://img.shields.io/npm/v/higlass-labeled-annotation.svg)](https://www.npmjs.com/package/higlass-labeled-annotation)
[![build status](https://img.shields.io/travis/flekschas/higlass-scalable-insets/master.svg?colorB=ffa500)](https://travis-ci.org/flekschas/higlass-labeled-annotation)
[![demo](https://img.shields.io/badge/demo-awesome-red.svg?colorB=3cb371)](http://higlass-labeled-annotation.lekschas.de/)

![HiGlass with a labeled annotation](/teaser.jpg?raw=true "Look at that wonderful labeled annotation. Isn't it a beauty?")

**Live Demo:** [http://higlass-labeled-annotation.lekschas.de](http://higlass-labeled-annotation.lekschas.de)

**Note**: This is the source code for labeled annotation track. You might want to check out HiGlass core repositories too:

- HiGlass viewer: https://github.com/hms-dbmi/higlass
- HiGlass server: https://github.com/hms-dbmi/higlass-server

## Installation

```
npm install higlass-scalable-insets
```

## Usage

1. Make sure you load this track prior to `hglib.js`. For example:

```
<script src="higlass-labeled-annotation.js"></script>
<script src="hglib.js"></script>
<script>
  ...
</script>
```

2. Configure the track in the view config.

```
{
  ...,
  tracks: {
    center: [
      {
        type: 'labeled-annotations',
        options: {
          regions: [
            [
              100, 200,
              100, 200,
              'rgba(0, 0, 0, 0)',
              'fuchsia',
              10, 10,
              'Super'
            ],
            [
              300, 400
              100, 200,
              'rgba(0, 0, 0, 0)',
              'orange',
              10, 10,
              'cool'
            ],
          ]
        },
      },
      ...
    ]
  }
}
```

Take a look at [`src/index.html`](src/index.html) for an example.

## Development

### Installation

```bash
$ git clone https://github.com/flekschas/higlass-labeled-annotation && higlass-labeled-annotation
$ npm install
```

### Commands

**Developmental server**: `npm start`

**Production build**: `npm run build`

**Prerelease build**: `npm run prerelease`
