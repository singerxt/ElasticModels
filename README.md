# ElasticModels
![dep](https://david-dm.org/singerxt/elasticmodels.svg)
![ready?](https://img.shields.io/badge/state-in%20progress-yellow.svg)

ElasticModels is a [elasticsearch](https://github.com/elastic/elasticsearch) object modeling tool designed to work in and asynchronous environment.
Builded for [official elasticsearch client library](https://github.com/elastic/elasticsearch-js)
Main inspiration was [mongoose](http://mongoosejs.com/) project.

# Documentation

WIP

# Installation

WIP

# Overview

### Connecting to Elasticsearch

First, we need to define a connection.

```javascript
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
const { schema } = require('./lib')(client, {});
```

### Defining a Model

Models are defined through the `schema` interface.

```javascript
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
const { schema } = require('./lib')(client, {});

const video = schema('video', {
  id: {
    type: String,
  },
  length: {
    type: Number,
  },
  description: {
    type: String,
  },
  descriptionShort: {
    type: String,
    dependencies: ['description'],
    translation: description => description.subString(0, 20) + '...',
  },
  comments: { //Async field
    type: [Object],
    dependencies: ['videoId'],
    translation: videoId => getVideoCommentsForId('id'), // this returning Promise
  }, {
    index: 'video', // required! elastic search index
    type: 'fullEpisode', // required! elasticsearch type
  },
});

```

### Field definition

You have couple options to define field in schema. The most simple is

1. Simple field. This field will looks if `id` exist in data and return value.
```javascript
id: {
  type: String,
}
```

2. Field with string translation. If you need to get value from object type field you can use define field like this.
```javascript
name: {
  type: String,
  translation: 'namespace.description' // You can use dot notation. :-)
}
```

3. Field with string translation with fallback. If you need to get value from field/object and if not exist you want to fallback from another data.
```javascript
description: {
  type: String,
  translation: ['namespace.description, default.description'],
}
```

4. Field with function as translation. If you need to execute code before feeling a field. (Sync)
```javascript
description: {
  type: String,
  dependencies: ['namespace.description, default.description'],
  translate: (desc, defaultDesc, options) => {
    if (desc) {
      return desc;
    } else if(defaultDesc) {
      return defaultDesc;
    } else {
      return 'description not found :('
    }
  }
}
```

5. Field with function as translation. If you need to populate field using another model or you need to pull data from different api
you can return `Promise` from translation function.

```javascript
articles: {
  type: Array,
  dependencies: ['articlesIds'];
  translation: (articlesIds) => articleModel.find({id: articlesIds}).then(docs => docs.getDocuments);
}
```


### Accessing a Model

Once we define model through `schema('ModelName', mySchema)`, we can access it through the same function.

```javascript
const video = schema('video', video);

video.find(query, options).then(documents => documents.getDocuments());
```
you can also `findById`

Important! `.find` method returning `documents` objects to access data you have to resolve `documents.getDocuments()`

### Adding new methods for schema.

You can extend model using `.addMethod(name, func)` method.

```javascript
const video = schema('video', video);

video.addMethod('findOnlyShortVideos', function () {
  return this.find({
    length: '..30000', // find videos what have length less then 30000ms.
  })
});

video.methods.findOnlyShortVideos().then(result => {
  console.log(result); // collection of videos what have length less then 30000ms.
});
```

### Pagination

Model have build in pagination.

```javascript
const video = schema('video', video);

video.find({}, {
  size: 30, // default 25
  from: 0, // default 0
}).then(result => {
  console.log(result); // first 30 objects
});
```



You can also delete extra method using `.deleteMethod('findOnlyShortVideos')`

### Embedded Documents

WIP

### Middleware

WIP


### API Docs


# License

The MIT License (MIT)
Copyright (c) 2016 Mateusz Śpiewak.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
