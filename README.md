---
title: Newsflash API
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.23"

---

# Newsflash API

Base URLs:

# Authentication

# Sample APIs

## GET Find pet by ID

GET /pet/{petId}

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|petId|path|string| yes |pet ID|

> Response Examples

```json
{
  "code": 0,
  "data": {
    "name": "Hello Kitty",
    "photoUrls": [
      "http://dummyimage.com/400x400"
    ],
    "id": 3,
    "category": {
      "id": 71,
      "name": "Cat"
    },
    "tags": [
      {
        "id": 22,
        "name": "Cat"
      }
    ],
    "status": "sold"
  }
}
```

> 400 Response

```json
{
  "code": 0,
  "message": "string"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|none|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» code|integer|true|none||status code|
|» data|[Pet](#schemapet)|true|none||pet details|
|»» id|integer(int64)|true|none||Pet ID|
|»» category|[Category](#schemacategory)|true|none||group|
|»»» id|integer(int64)|false|none||Category ID|
|»»» name|string|false|none||Category Name|
|»» name|string|true|none||name|
|»» photoUrls|[string]|true|none||image URL|
|»» tags|[[Tag](#schematag)]|true|none||tag|
|»»» id|integer(int64)|false|none||Tag ID|
|»»» name|string|false|none||Tag Name|
|»» status|string|true|none||Pet Sales Status|

#### Enum

|Name|Value|
|---|---|
|status|available|
|status|pending|
|status|sold|

HTTP Status Code **400**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|

HTTP Status Code **404**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|

## DELETE Deletes a pet

DELETE /pet/{petId}

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|petId|path|string| yes |Pet id to delete|
|api_key|header|string| no |none|

> Response Examples

```json
{
  "code": 0
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» code|integer|true|none||none|

## POST Add a new pet to the store

POST /pet

> Body Parameters

```yaml
name: Hello Kitty
status: sold

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» name|body|string| yes |Pet Name|
|» status|body|string| yes |Pet Sales Status|

> Response Examples

```json
{
  "code": 0,
  "data": {
    "name": "Hello Kitty",
    "photoUrls": [
      "http://dummyimage.com/400x400"
    ],
    "id": 3,
    "category": {
      "id": 71,
      "name": "Cat"
    },
    "tags": [
      {
        "id": 22,
        "name": "Cat"
      }
    ],
    "status": "sold"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### Responses Data Schema

HTTP Status Code **201**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» data|[Pet](#schemapet)|true|none||pet details|
|»» id|integer(int64)|true|none||Pet ID|
|»» category|[Category](#schemacategory)|true|none||group|
|»»» id|integer(int64)|false|none||Category ID|
|»»» name|string|false|none||Category Name|
|»» name|string|true|none||name|
|»» photoUrls|[string]|true|none||image URL|
|»» tags|[[Tag](#schematag)]|true|none||tag|
|»»» id|integer(int64)|false|none||Tag ID|
|»»» name|string|false|none||Tag Name|
|»» status|string|true|none||Pet Sales Status|

#### Enum

|Name|Value|
|---|---|
|status|available|
|status|pending|
|status|sold|

## PUT Update an existing pet

PUT /pet

> Body Parameters

```json
{}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

```json
{
  "code": 0,
  "data": {
    "name": "Hello Kitty",
    "photoUrls": [
      "http://dummyimage.com/400x400"
    ],
    "id": 3,
    "category": {
      "id": 71,
      "name": "Cat"
    },
    "tags": [
      {
        "id": 22,
        "name": "Cat"
      }
    ],
    "status": "sold"
  }
}
```

> 404 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|none|Inline|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» data|[Pet](#schemapet)|true|none||pet details|
|»» id|integer(int64)|true|none||Pet ID|
|»» category|[Category](#schemacategory)|true|none||group|
|»»» id|integer(int64)|false|none||Category ID|
|»»» name|string|false|none||Category Name|
|»» name|string|true|none||name|
|»» photoUrls|[string]|true|none||image URL|
|»» tags|[[Tag](#schematag)]|true|none||tag|
|»»» id|integer(int64)|false|none||Tag ID|
|»»» name|string|false|none||Tag Name|
|»» status|string|true|none||Pet Sales Status|

#### Enum

|Name|Value|
|---|---|
|status|available|
|status|pending|
|status|sold|

## GET Finds Pets by status

GET /pet/findByStatus

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|status|query|string| yes |Status values that need to be considered for filter|

> Response Examples

```json
{
  "code": 0,
  "data": [
    {
      "name": "Hello Kitty",
      "photoUrls": [
        "http://dummyimage.com/400x400"
      ],
      "id": 3,
      "category": {
        "id": 71,
        "name": "Cat"
      },
      "tags": [
        {
          "id": 22,
          "name": "Cat"
        }
      ],
      "status": "sold"
    },
    {
      "name": "White Dog",
      "photoUrls": [
        "http://dummyimage.com/400x400"
      ],
      "id": 3,
      "category": {
        "id": 71,
        "name": "Dog"
      },
      "tags": [
        {
          "id": 22,
          "name": "Dog"
        }
      ],
      "status": "sold"
    }
  ]
}
```

> 400 Response

```json
{
  "code": 0
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|*anonymous*|[[Pet](#schemapet)]|false|none||none|
|» id|integer(int64)|true|none||Pet ID|
|» category|[Category](#schemacategory)|true|none||group|
|»» id|integer(int64)|false|none||Category ID|
|»» name|string|false|none||Category Name|
|» name|string|true|none||name|
|» photoUrls|[string]|true|none||image URL|
|» tags|[[Tag](#schematag)]|true|none||tag|
|»» id|integer(int64)|false|none||Tag ID|
|»» name|string|false|none||Tag Name|
|» status|string|true|none||Pet Sales Status|

#### Enum

|Name|Value|
|---|---|
|status|available|
|status|pending|
|status|sold|

HTTP Status Code **400**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» code|integer|true|none||none|

# Data Schema

<h2 id="tocS_Pet">Pet</h2>

<a id="schemapet"></a>
<a id="schema_Pet"></a>
<a id="tocSpet"></a>
<a id="tocspet"></a>

```json
{
  "id": 1,
  "category": {
    "id": 1,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 1,
      "name": "string"
    }
  ],
  "status": "available"
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|integer(int64)|true|none||Pet ID|
|category|[Category](#schemacategory)|true|none||group|
|name|string|true|none||name|
|photoUrls|[string]|true|none||image URL|
|tags|[[Tag](#schematag)]|true|none||tag|
|status|string|true|none||Pet Sales Status|

#### Enum

|Name|Value|
|---|---|
|status|available|
|status|pending|
|status|sold|

<h2 id="tocS_Category">Category</h2>

<a id="schemacategory"></a>
<a id="schema_Category"></a>
<a id="tocScategory"></a>
<a id="tocscategory"></a>

```json
{
  "id": 1,
  "name": "string"
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||Category ID|
|name|string|false|none||Category Name|

<h2 id="tocS_Tag">Tag</h2>

<a id="schematag"></a>
<a id="schema_Tag"></a>
<a id="tocStag"></a>
<a id="tocstag"></a>

```json
{
  "id": 1,
  "name": "string"
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||Tag ID|
|name|string|false|none||Tag Name|

