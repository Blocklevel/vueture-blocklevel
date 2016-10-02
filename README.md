# vue-2-boilerplate
> A boilerplate for building medium to large Vue 2.0 single page applications

Vueture(Blocklevel) is forked from [Vueture](http://www.github.com/vueture) which is based on the [V]ue webpack template](http://vuejs-templates.github.io/webpack/).

Be sure to checkout the [Vuejs docs](http://vuejs.org/guide/).

## Usage
To get up and running run:
``` bash
$ npm install
$ npm run dev
```

## Configuration ##
To get up and running real quick, `npm install` is enough.
But if you want to, let's say, connect to an external API, there's a little bit more involved.
You need to configure your application a bit more, explained below:

### Config files ###
Inside the `config/*.env.js`-files, you can configure your environment variables.
Out of the box the applications comes bundled with AJAX-support.
The only thing you need to do is change the `API_LOCATION` to your endpoint.

For more information, visit the [docs](http://vuejs-templates.github.io/webpack/env.html).

## What's included ##
- `npm run dev`: first-in-class development experience.
  - Webpack + `vue-loader` for single file Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build`: Production ready build.
  - JavaScript minified with [UglifyJS](https://github.com/mishoo/UglifyJS2).
  - HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
  - All static assets compiled with version hashes for efficient long-term caching, and a production `index.html` is auto-generated with proper URLs to these generated assets.

- `npm run styleguide`: Create styleguide based on [kss-node](https://github.com/kss-node/kss-node).
  - Creates a `styleguide` folder in the root of your project.
  - Open `styleguide/index.html` to your projects styleguide.

## Important Files ##
So there are a couple of important files that needs to be addressed:

### bootstrap.js ###
This file will bootstrap the application.
It will load:
 - vue
 - vue-resource
 - vuex-router-sync
 - vue-router
 - vuex

Don't like one of those packages?
Just strip them from the `bootstrap` and the `package.json`-files.

### main.js ###
This file will load your single page application.
It is also the entry point which will be loaded and compiled using webpack.

### app/index.vue ###
The main Vue file.
This file will load the page inside the `router-view`-component.

## Structure ##
Inside the `src/app`-directory, are a couple directories that needs to be addressed:

### Components ###
Your components will be placed inside this directory.

### Mixins ###
The mixins you want to use with Vue will be placed inside this directory.

### Pages ###
The pages/views are placed inside this directory.
By default it comes with a `home/index` page.

### Services ###
You can compare services with controllers.
They connect with external services, like an API, and call actions on the store.

### Store ###
As mentioned before, Vuex is used as a single point of truth.
To learn more about Vuex, visit the [documentation](http://vuex.vuejs.org)

### Transformers ###
Transformers are used to transform the incoming and outgoing requests.
If you have an API where you can retrieve posts from, a post wil look something like this:
``` JSON
{
  "id" : 1,
  "title" : "Hello World!",
  "content" : "Lorem Ipsum",
  "created_at" : "today"
}
```
However, it feels weird to use snake_cased variables inside your camelCased application.
This is where transformers come in.
So given the previous example, using a transformer, it will look something like this:
``` JSON
{
  "id" : 1,
  "title" : "Hello World!",
  "content" : "Lorem Ipsum",
  "createdAt" : "today"
}
```

## Packages
This build comes with the following plugins installed:
- [vueture-blocklevel-sass-utils](https://github.com/Blocklevel/vueture-blocklevel-sass-utils/blob/master/README.md) A Blocklevel Vueture SASS plugin, contains mixins, functions and extends for faster templating.

## Other packages
**CAUTION:** These packages are not ready for production yet!
- **(WIP)** [vueture-hamburger](https://github.com/timrijkse/vueture-hamburger) - Hamburger icon and mobile navigation for Vueture.
