## The Project

The idea for a portfolio is well known. I wanted a site of my own on the big world wide web to showcase the projects I've done (and those that are to come). However I wanted to get something else out of building a portfolio.

I wanted to experiment and learn about several technologies with this side project (ES6, Flex and Grunt mainly). Thus, from the beginning I forbide myself to use any framework. The
use of jQuery/Bootstrap/Vue.js/Angularjs... was not allow for the development. Moreover, the page was going to be so simple that I thought it was really unnecessary to make my visitors download any extra KB.

## Project organization

On my current company, I've been using agile development methodologies. We do the whole Scrum thing. Planning, development based on user's stories and
3 week long sprints. I have to confess that I'm a fan of agile development, for the good organization on the current projects I've been experiencing. This made me decide
to adopt some of the Scrum principles for this side-project. Of course is a very simplistic version, so simplistic that maybe I shouldn't even call
it Scrum 😅.

During the development of the page I've been using a Trello board with 5 lists that I'll explain in some detail:

* To Do
* In Progress
* On Hold
* Done
* Discarded

### To Do List

This is a **prioritized** list with all the [User's Stories](https://www.mountaingoatsoftware.com/agile/user-stories) wanted on my portfolio. The word 
*prioritized* is stressed for a reason. I've discovered on my daily work that using a prioritized list has a huge impact on your productivity.

First, it allows you to not having to worry about what to pick up next when you're done with your current task. Just take the following one at the top of the list

Have you ever been developing when suddenly a great idea for a new impleentation just spawned in your mind? I have, and before a blink of an eye, I find myself developing that new idea letting my current task unfinished. And it can happen a fair amount of times.

If this has been your case as well, maybe this list can help. Its second advantage is it avoids to get distracted with those new cool feature you've just came up with. Instead, that idea  goes at the bottom of the *To do list*, and it will be adressed eventually.

### In Progress

This is one of those lists that is much more usefull when working with a team. With it I can see which User's Stories are already being developed right now, getting those stories out of the *To do list*. However, as I've been a single developer while programming my portfolio, there wasn't going to be any story that I didn't pulled out myself from the *To do list*.

Thus this list was never going to be bigger than one item long. However I kept the list for familiarity, and because it feels great to move a story to *In progress*. Besides, it quickly tells you what you've been into the last session and fosters the hyper-focus single-task mindset. This last feature was something I discovered while using the list, rather than a reason for making the list itself. But was a pleasant discovery anyhow 😁.

### On Hold

I think none of the user's stories hit this list in the whole development. The list is intended for those user's story that have been started but that for some reason you can't move them to the *Done list*. In my experience, the main reasons for keeping a User's story *On Hold* are

* You're blocked for some other User's Story that has to be finished before.
* There's something you unclear about the User's Story and you have to ask and wait until the client clarifies it

However, as there wasn't anyone else but me doing this, I've never done two User's Stories at once (Very unlikely even if I wanted 🤔). So, having prioritized properly the *To Do list* there's no reason why a User's Story should block me And since it was a personal project, whatever the doubt about a User's story was, I answered myself 😂.

### Done

The last resort for any of your User's Story. The purpose of this list is cristal clear, isn't it? Any finished User's Story will jump from *In Progress* to *Done*. There's no magic in this list.

Yet, There's one recomendation I'd give to you. I like to have at the top of the list the most recent completed User's Story. This way I can quickly see the last completed tasks, giving me more context on how the project is going, more than just with the *In Progress* list, at least.

### Discarded

It happened to me a couple of times that, after starting a User's Story, I see no use on it. The feature was going to be useless, or just not worth the time. On these cases, instead of archiving, I put them into this list. There's no much use on this list either, however I like to see the things I've discarded rather than hidding them. Personal preference, I suppose.

## Making and tracking progress

https://twitter.com/ossia/status/911314081524719616?s=09

Currently I'm hired as a full-time web developer, which is great for so many reason 😊 but not that great in terms of letting you spare time for side projects and personal development 😓. Despite of this fact, I managed to consistently devote 1 hour to this project every day after work. And despite the lack of free time, I managed to gather about 41 hours of work in 2 months.

I've been able to give you the exact amount of time because I've tracked every minute focused on building the project using *Toggl*. This has worked great for me, far better than I expected.

First, tracking is a motivational burst as I can see every week that I'm really moving forward. Then, the fact of clicking the timmer start button helps on reaching the hyper-focused state of mind. And last but not least, mixing a tracking system with pomodoro timers (something that Toggle does out of the box) has also proved to have a good impact on me, in these years (I procrastinate less, having a full session is less tough, and also helps to be focused on a 25 minutes long time lapse).

Well, I think I've talked enough about meta-work. Let's dive into what really matters, the project itself.

## My portfolio walkthrough

### Setting up my development enviroment

#### Grunt

#### Installing dependencies
```
npm i -D babel-eslint babel-preset-es2015 grunt-babel grunt-cli grunt-contrib-clean grunt-contrib-copy grunt-contrib-sass grunt-contrib-watch grunt-mkdir grunt-postcss grunt-responsive-images load-grunt-tasks
```

#### load-grunt-task 
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

#### babel
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

#### Tasks for css

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

#### Generating responsive images

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

#### The build process.

For getting everything working together propperly, I have a build process that first prepares my assets folder and then launches the processes for my **javascript**, **scss** and **images** files.

This time we have more dependencies:
*
*
*

### The Layout

### The sections
