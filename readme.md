#Vapor Clean

A *lean* template for creating Vapor applications from scratch, with everything you need to make a quick start, and nothing that could have a negative impact on your workflow.

##Usage

First off, head over to the [Vapor](https://github.com/qutheory/vapor) repo to install the latest version of the framework; you can use `curl -sL check.qutheory.io | bash` to verify that your environment is good to go.

Once your environment is configured correctly use the following commands to install the [Vapor Toolbox](https://vapor.readme.io/docs/install-toolbox) and ensure it's up to date:

```
curl -sL toolbox.qutheory.io | bash
vapor self update
```

You can now create your project using this repo as the template:

```
vapor new PROJECT-NAME --template=https://github.com/dmgash/vapor-clean.git
cd PROJECT-NAME
vapor build
vapor run
```

###Gulp

In keeping with the aim that this template should enable you to start writing a great Vapor app quickly and easily, we've added **gulpfile.js** to help automate some of the monotonous tasks associated with front-end dev.

At a summary level, the provided gulpfile will help you:

* compile .scss source files, including the automatic addition of vendor prefixes,
* minify .js and .css files for improved performance,
* generate sourcemaps to aid bug resolution, and;
* automatically monitor your source code directories for changes, triggering the actions above without the need to lift a finger.

To put the gulpfile to use, you'll need to install [node.js](https://nodejs.org), including the node package manager ("npm"). Once installed, create your Vapor project as per the guidance above, `cd` into your project directory and run `npm install` to install gulp dependencies. All that's left is to run `gulp` to put the magic to work. That's it!

We'll be building out dedicated [wiki](https://github.com/dmgash/vapor-clean/wiki) pages to explain what the provided gulpfile does in more detail, and encourage you to play around with it to find the right balance to complement the way you work.

Over time we'll look to enhance this package so that it has everything you need to start building with Vapor quickly and easily, though always with the aim of giving you only what you need, without all the hassle of having to unpick unnecessary boilerplate code.

##Contributions

We welcome contributions to this package, so if you have any thoughts or ideas on how we could improve it, feel free to log an [issue](https://github.com/dmgash/vapor-clean/issues) or send us a [pull request](https://github.com/dmgash/vapor-clean/pulls).
