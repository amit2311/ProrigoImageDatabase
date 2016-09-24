# ProrigoGallery

#### A great looking and easy-to-use photo-management-system.

![ProrigoGallery](http://l.electerious.com/uploads/big/c4b58cb87d95aeaed78fdca581cc908c.jpg)
![ProrigoGallery](http://l.electerious.com/uploads/big/075ac5de5b5d6c593acbb700f0e1d739.jpg)

ProrigoGallery is a free photo-management tool, which runs on your server or web-space. Installing is a matter of seconds. Upload, manage and share photos like from a native application. ProrigoGallery comes with everything you need and all your photos are stored securely. Try the [Live Demo](http://ld.electerious.com) or read more on our [Website](http://ProrigoGallery.electerious.com).

## Installation

To run ProrigoGallery, everything you need is a web-server with PHP 5.5 or later and a MySQL-Database. Follow the instructions to install ProrigoGallery on your server. [Installation &#187;](docs/Installation.md)

## How to use

You can use ProrigoGallery right after the installation. Here are some advanced features to get the most out of it.

### Settings

Sign in and click the gear on the top left corner to change your settings. If you want to edit them manually: MySQL details are stored in `data/config.php`. Other options and hidden settings are stored directly in the database. [Settings &#187;](docs/Settings.md)

### Update

Updating is as easy as it should be.  [Update &#187;](docs/Update.md)

### Build

ProrigoGallery is ready to use, right out of the box. If you want to contribute and edit CSS or JS files, you need to rebuild ProrigoGallery. [Build &#187;](docs/Build.md)

### Keyboard Shortcuts

These shortcuts will help you to use ProrigoGallery even faster. [Keyboard Shortcuts &#187;](docs/Keyboard Shortcuts.md)

### Dropbox import

In order to use the Dropbox import from your server, you need a valid drop-ins app key from [their website](https://www.dropbox.com/developers/apps/create). ProrigoGallery will ask you for this key, the first time you try to use the import. Want to change your code? Take a look at [the settings](docs/Settings.md) of ProrigoGallery.

### Twitter Cards

ProrigoGallery supports [Twitter Cards](https://dev.twitter.com/docs/cards) and [Open Graph](http://opengraphprotocol.org) for shared images ([not albums](https://github.com/electerious/ProrigoGallery/issues/384)). In order to use Twitter Cards you need to request an approval for your domain. Simply share an image with ProrigoGallery, copy its link and paste it in [Twitters Card Validator](https://dev.twitter.com/docs/cards/validation/validator).

### Imagick

ProrigoGallery uses [Imagick](http://www.imagemagick.org) when installed on your server. In this case you will benefit from a faster processing of your uploads, better looking thumbnails and intermediate sized images for small screen devices. You can disable the usage of [Imagick](http://www.imagemagick.org) in [the settings](docs/Settings.md).

### Docker

Browse the [Docker Hub Registry](https://hub.docker.com/r/kdelfour/ProrigoGallery-docker/) for various automated ProrigoGallery-Docker builds. We recommed to use [ProrigoGallery-docker](https://hub.docker.com/r/kdelfour/ProrigoGallery-docker/) by [kdelfour](https://github.com/kdelfour).

### Plugins and Extensions

The plugin-system of ProrigoGallery allows you to execute scripts, when a certain action fires. Plugins are hooks, which are injected directly into ProrigoGallery. [Plugin documentation &#187;](docs/Plugins.md)

It's also possible to build extensions upon ProrigoGallery. The way to do so isn't documented and can change every time. We recommend to use the plugin-system, when possible.

Here's a list of all available Plugins and Extensions:

| Name | Description | |
|:-----------|:------------|:------------|
| ProrigoGallerysync | Sync ProrigoGallery with any directory containing photos | [More &#187;](https://github.com/GustavePate/ProrigoGallerysync) |
| ProrigoGalleryupload | Upload photos to ProrigoGallery via SSH | [More &#187;](https://github.com/r0x0r/ProrigoGalleryupload) |
| Jekyll | Liquid tag for Jekyll sites that allows embedding ProrigoGallery albums | [More &#187;](https://gist.github.com/tobru/9171700) |
| ProrigoGallery-redirect | Redirect from an album-name to a ProrigoGallery-album | [More &#187;](https://github.com/electerious/ProrigoGallery-redirect) |
| ProrigoGallery-watermark | Adds a second watermarked photo when uploading images | [More &#187;](https://github.com/electerious/ProrigoGallery-watermark) |
| ProrigoGallery-rss | Creates a RSS-Feed out of your photos | [More &#187;](https://github.com/cternes/ProrigoGallery-RSS) |
| ProrigoGallery-FlashAir | Import from a Toshiba FlashAir WiFi SD card | [More &#187;](https://github.com/mhp/ProrigoGallery-FlashAir) |
| ProrigoGallery-webroot | Controls photos accessibility and keeps ProrigoGallery files hidden | [More &#187;](https://github.com/Bramas/ProrigoGallery-webroot) |
| ProrigoGallery-create-medium | Generate missing medium size photos | [More &#187;](https://github.com/Bramas/ProrigoGallery-create-medium) |

## Troubleshooting

Take a look at the [FAQ](docs/FAQ.md) if you have problems. Discovered a bug? Please create an issue here on GitHub!

## Donate

I am working hard on continuously developing and maintaining ProrigoGallery. Please consider making a donation via [Flattr](https://flattr.com/submit/auto?user_id=electerious&url=http%3A%2F%2FProrigoGallery.electerious.com&title=ProrigoGallery&category=software) or PayPal (from [our site](http://ProrigoGallery.electerious.com/)) to keep the project going strong and me motivated.
