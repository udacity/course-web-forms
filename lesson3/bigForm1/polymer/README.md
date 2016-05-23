To install and run the Polymer checkout form:

1. Install [npm](https://www.npmjs.com/), [bower](http://bower.io/) and [gulp](http://gulpjs.com/) if you haven't already.
2. Run `npm install` to install node modules.
3. Run `bower install` to install bower components (all the Polymer elements).
4. Make changes to the files in `/src`.
4. Run `gulp serve` to spin up a server and automatically open a new tab with http://localhost:3000/dest. Files in `/src` will be watched and processed to `/dest` when you save.
  * `gulp watch` is the same as `gulp serve` but it does not create a server.
  * `gulp` will rebuild `dest/` once without watching files or serving.