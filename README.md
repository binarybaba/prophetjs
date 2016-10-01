# prophetjs

A highly customizable, fast, lean, and dependency free, javascript library for displaying toast messages on web pages

### Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/). This documentation will presently remain in flux while prophet is build for first  release.

### Unreleased Version
#### Added
 - 3 preset types: default, error, success,
 - A stack of all Messages delivered by prophet
 - Support for setting new presets
 - Support for new classes to override per message
 - Support for a callback
 - Support for chaining
 - Manual show
 - Support for the following styles of init:
 --- new Message("Awesome!").show();
 --- new Message("Awesome!", function(id){ ...do something }).show();
 --- new Message("Awesome!", {duration:1000, ... }, function(id){ ... do something}).show();
 ---



### License

MIT
