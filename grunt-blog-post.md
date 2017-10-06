[As every programmer should](http://threevirtues.com/), I'm lazy. I'm lazy as hell for any action I have to repeat several times. And overall, I'm lazy for doing long tedious tasks that doesn't imply any mental effort. The bad thing about programming is that there are a lot of this time-consuming-not-enjoyable tasks. Fortunately, we can make our life easier by using some automatation scripts. What's the point in being a programmers if not for making computers do our work? That's why I'm so into bash aliases that runs long scripts, configuring my computer to open all my needed programs on start up, and using a task manager to avoid the repetitive tasks while developing a new web page. This last point is the one I cover at this blog post. So, if you want to save time and improve your projects quality grab a drink and continue reading.

> TL;DR :
> * Install at your computer [ImageMagick](https://www.imagemagick.org/script/index.php)
> * Copy and paste at your projects folder this package.json and Gruntfile.json files.

Grunt is the task manager of my choice for automaizing processes while I've been developing my portfolio. I know there are a lot of different possibilities out there for doing so, but since I started to use it because of an Udacity course about [responsive images ](https://www.udacity.com/course/responsive-images--ud882) and liked it, I keep using it.

Starting to use it is not that intuitive, or at least not for what I consider is the minimum useful configuration. That's the motivation for this blogpost, have all this information I've had to search through internet in a single place. I hope this is of some use to you 😁 . With the configuration below, you'll have:
* ES6 to ES5 compilation
* Scss to CSS compilation
* All vendor CSS prefixes added to your CSS files
* Image compression
* AND! My favorite, Auto-refresh of the web browser. No more CTRL + F5 (CMD + R)

Let's begin!

# Installing dependencies

This are all the dependencies your going to need for this walkthrough.

Node dependencies:

```
npm i -D babel-eslint babel-preset-es2015 grunt-babel grunt-cli grunt-contrib-clean grunt-contrib-copy grunt-contrib-sass grunt-contrib-watch grunt-mkdir grunt-postcss grunt-responsive-images load-grunt-tasks
```

Other dependencies:

* [ImageMagick](https://www.imagemagick.org/script/index.php)

# load-grunt-task 
This module for grunt automatically imports all the other modules you have installed in your project. So for exemple, instead of having to declare:

```
grunt.loadNpmTasks('grunt-contrib-sass')
grunt.loadNpmTasks('grunt-contrib-clean')
grunt.loadNpmTasks('grunt-contrib-copy')
grunt.loadNpmTasks('grunt-contrib-sass')
grunt.loadNpmTasks('grunt-contrib-watch')
```

You can simply do: 

```
require("load-grunt-tasks")(grunt);
```

# babel
This module is a post-processor for your JavaScript. The following configuration is which I use for converting my ES6 files to ES5.

For this module to work you need to have installed `babel-preset-es2015` npm package and then configure at your `package.json` this bit:

```
"babel": {
    "presets": [
        "es2015"
    ]
}
```
Finally, add to your Gruntfile:

```
"babel": {
    options: {
        sourceMap: true  // Generate .map files at destination
    },
    dist: {
        files: {  // 'destination_file': 'source_file'
            'public/app.js': 'js/app.js',
            'public/form-submission.js': 'js/form-submission.js'
        },
        options: {
            minified: true  // Minify files
        }
    }
}
```

Besides converting ES6 code to ES5, this configuration creates `.map` files at the destinations and minifies each file.

Something that seemed weird to me at first was that the destination path is the key for the `files` config object, whereas the source path is the value for that key. Instinctively I'd thought in a `source → destination`but is the contrary. Sure they have their resons, but took me a little to realize of this.

# Tasks for css

The following Grunt configuration allows to use `scss` files for the project styles instead of plain CSS. You know, all that about being 'sassy' with your CSS from CodeSchool 😜. But there's mor! In addition, this configuration will add all the needed prefixes for your css rules to make your styles work in as many browsers as possible. Personally, I don't know how I've lived without this for so long 🙃.

First, the dependencies:
* `autoprefixer`
* `grunt-contrib-sass`
* `grunt-postcss`

The workflow for the sytles is: `grunt-contrib-sass` converts scss to css, then  `grunt-postcss` takes that css and using `autoprefixer`, adds the browser vendors.

But there's one more dependency, something you have to add to the `package.json` file:

```
"browserslist": [
    " > 5%",
    "last 2 versions"
],
```

Browserlist isn't an autoprefixer nor grunt-postcss thing. Browserlist is actually a web page ([browserl.ist](http://browserl.ist/)) that offers an api to query for web browsers names. And then, some modules as autoprefixer uses the result of the query for their configuration, [something that makes our lifes easier](https://css-tricks.com/browserlist-good-idea/). But what does the configuration above do?:

* "> 5%" → Return all browsers' names with a minimum usage of 5%
* "last 2 versions" → Return the names for the last 2 versions of every browser

 You can go you to the [browserl.ist webpage](http://browserl.ist/) and play with its query search bar and see the results. Actually, I really encourage you to play a bit with it,because some useless criteria could've been added otherwise.

For example, while writting this blogpost I did play with [browserl.ist](http://browserl.ist/) and discovered that there's no use in mixing the above two criteria. This is due to the searcher returning any browser name that matches at least one of the different rules provided. This means that the search looks for `criteria1 OR criteria2` and since all the browsers with a usage greater than 5% are a subset of all the last 2 versions of every browser, I could remove the first criteria getting the same result. This is true for now, though. With the following browser releases, who knows if everyone will instantly update.

> By the way, I found curious that browserlist uses [Can I Use](http://caniuse.com/) data.

Well, once we have browserlist with our wanted specifications, there's just the Gruntfile config left:

```
"sass": {
    dist: {
        files: {
            'public/styles.css': 'scss/main.scss'
        },
        options: {
            style: 'compressed'
        }
    }
},
"postcss": {
    options: {
        map: true,
        processors: [
            require('autoprefixer')({browsers: ["> 5%"]})
        ]
    },
    dist: {
        src: 'public/*.css'
    }
},
```

Notice that, same as with Babel, we use an option to get the result css compressed. The destination → source fashion is kept in `gulp-contrib-sass` as well. However `grunt-postcss` only needs the *src* because it modifies the **css file** itself

I allways tend to reduce the number of request my pages need. That's why I use a `main.scss` file where I import all the app scss files. this way I have all my styles in a single file.


```scss
@import '_resources.scss';
@import '_layout.scss';
@import '_brand_styles.scss';
@import '_cv_styles.scss';
@import '_projects_styles.scss';
@import '_contact_styles.scss';
```
> Example from my portfolio page main.scss file


I suppose there are cases where is better to have the css load modularized, but that's an issue to adress in big projects. For every project I've made so far, this approach has been good enough.

# Generating responsive images

It's not a discovey that nowadays, most websites are accesed via mobile devices. Smartphones and tablets are the main window for internet for so many people. That means that, probably, quite a lot of your visitors are using their mobile data plans for accessing your site. And those are often limited in how many GB they can download per month. For this reason is really important that as an act of respect for all of them, we developers try to compress our sites. Optimizing them for being mobile data friendly 😁. And the biggest data impact for a web page are images.

The following configuration will automatically compress your images with 2 different resolutions. The process will let your originals intact, dumping the result files in a diferent folder.

For this process, we need as dependencies:
* `grunt-responsive-images`
* `grunt-contrib-copy`

Then, add the following configuration to the `Gruntfile.js`

```
responsive_images: {
    jpeg_images: {
        options: {
            engine: 'im',
            sizes: [
                {
                    name: '2x',
                    width: 1600,
                    quality: 30
                },
                {
                    name: '1x',
                    width: 800,
                    quality: 30
                }
            ]
        },
        files: [{
            expand: true,
            src: ['*.{gif,jpg}'],
            cwd: 'images/',
            dest: 'public/images/'
        }]
    }
},
copy: {
    main: {
        files: [{
            expand: true,
            cwd: 'images/',
            src: ['*.svg', '*.png'],
            dest: 'public/images/'
        }]
    }
}
```

In the `options` section, we use the compression enginge 'im' which stands for `ImageMagick`. This is a software you have to get installed in advance for using this compression process.

Following the engine specification, there's the sizes property. This is an array with all the diferent versions we want for each images. In my case I have 2 sizes with a `width` of 1600 and 800 respectively. The `quality` in both cases will be of 30 (more than enough for any image). And finally, each file will have a **sufix** pointing out its version (which we configure in the `name` property).

At the `files` configuration, again we have an array. This is usefull in case we have several data origins, destinations or such. The `cwd` is the **source directory** for the files. In the `dest` object key, we set the **destination** for the processed images. Finally, at the `src` property, we have an array with all the **source files**. Noticed that we can set patterns to match instead of full files names. In the configuration I'm showing in this post, the target for the **responsive_images_process** are **gif** and **jpg** images.

Finally, with the `copy` process, all the `svg` and `png` files are moved toguether with the ones affected by the `responsive_images` configuration. The svg files are the better optimized for the web, so we don't have nothing to do here. And the `png` ones ... Well, I didn't managed to make **ImageMagick** to compress them 😅. Lucky me, their usually pretty light.

# The build process.

For getting everything working together propperly, I have a build process that first prepares my assets folder and then launches the processes for my **javascript**, **scss** and **images** files.

This task dependencies are:
* `grunt-contrib-clean`
* `grunt-mkdir`

And the grunt file configuration:

```
mkdir: {
    dev: {
        options: {
            create: ['public/images']
        },
    },
},

clean: {
    dev: {
        src: ['public'],
    },
},


// Register the tasks
grunt.registerTask("clean-public", ["clean", "mkdir"]);
grunt.registerTask("build", ["clean-public", "responsive_images-task", "sass-task", "babel-task"]);
```

This process has no magic and everything is pretty straightforward. So lets continue to the next task.

# Watch task. Apply changes automatically and refresh the browser

This is my favourite task. It was, indeed, the whole point for learning Grunt 😁.

This task will stay alert to the files you configure, and when any of thouse change, it will launch the needed tasks to see your changes applied. And you won't even have to refresh the browser your own. Sweet, isn't it?

The dependency `grunt-contrib-watch` is the one which does all the magic.

Once installed, configure at Gruntfile.js:

```
"watch": {
    css: {
        files: [ 'scss/*.scss'],
        tasks: ['sass','postcss']
    },
    js: {
        files: [ 'js/*.js'],
        tasks: ['babel']
    },
    html: {
        files: ["index.html"]
    },
    images: {
        files: ['images/*'],
        tasks: ['responsive_images']
    },
    options: { livereload: true },
}


// Set the task
grunt.registerTask("default", ["build","watch"]);
```

In every configuration key I have organized all the files I want the process to be aware of and which tasks should be launched every time one of the watched files change.

Finally the line `options: { livereload: true }` is which enables the browser autorefresh. This is the easiest way to do it. Personally, I don'tlike the kind of solution that implies getting a pluggin installed at your browser. However, with `grunt-contrib-watch` just add the following script at your page and you're done.

```
<script src="http://localhost:35729/livereload.js"></script>
```

Then, any watched file that is changed will trigger the refreshing of the browser. That's why I have the process listening for `index.html`. Even though it has no task associated, the fact of **watch** being listening for it's changes will refresh the browser when something in the DOM is modified.

You can't imagine how much I've loved this process while programing my portfolio 😍.


And that's been all. I leave you here my complete Gruntfile.js and package.json files in case you want to use them.

Happy coding =)

<script src="https://gist.github.com/edgarshurtado/6ed2fae56b300386b81f2c992a2da8ab.js"></script>
<script src="https://gist.github.com/edgarshurtado/38aa19212a692ce37885d5cd0c056ad8.js"></script>
