# HowBiased A/B Prototype


## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Building for Production:

```bash
yarn run browser-build-prod
# outputs UI to /dist
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Docker:

```bash
# run docker container in development mode
yarn docker:dev

# run docker container in production mode
yarn docker:prod

# run all tests in a docker container
yarn docker:test
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```


## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--views\          # UI
 |--app.js          # Express app
 |--index.js        # App entry point
```

### Routes

**Root routes**:\
`/` - Home, list articles
`/is/{article}` - Reader

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require('../utils/catchAsync');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error('Something wrong happened');
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
};
```

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<path to src>/config/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store them in log files.\
This app uses pm2 in production mode, which is already configured to store the logs in log files.

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).



### toJSON

The toJSON plugin applies the following changes in the toJSON transform call:

- removes \_\_v, createdAt, updatedAt, and any schema path that has private: true
- replaces \_id with id


## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`


## Articles
Articles are stored as *YAML* files in `/db/articles/`. These are copied into the `/dist` folder at build time.

> Recommendation: Update `routes/root/read.route.js` to pull articles from a S3 bucket as the app becomes more complex.

These YAML files are designed to store article meta data along with content as markdown.

### Format

```YAML
title: "U.S. Orders China to Close Houston Consulate, Citing Efforts to Steal Trade Secrets"
source: 
  name: "The New York Times"
  # Source icon is relative to root
  icon: "/db/sources/icons/nyt.png"
  url: "www.google.com"
author: "By Edward Wong, Lara Jakes and Steven Lee Myers"
date: "July 22nd, 2020"
body:
  # format: "markdown" is required at this time
  format: "markdown"
  # Body of article in markdown. The | operator allows multi line content
  value: |
    WASHINGTON — The United States has <mark class='subjective s'>abruptly</mark> ordered China to close its diplomatic consulate in Houston by Friday, <mark class='i'>accusing</mark> diplomats of aiding a nationwide pattern of economic espionage and attempted theft of scientific research, as part of a <mark class='s'>sharp escalation</mark> in the Trump administration’s moves against China.

    - Any
    - valid
    - markdown
```

### Marking Content

Article markdown supports html tags. To add highlights, use the `<mark>` tag with a highlight class.

`hedged`, `implicative`, `factive`, `assertive`, `subjective`, and `tigger` classes are supported and will activate the appropriate tip type and colors. Single letter shorthand classes are available for ease of use.

```JS
const VALID_TYPES = [
    'h', 'hedged',
    'i', 'implicative',
    'f', 'factive',
    'a', 'assertive',
    's', 'subjective',
    't', 'trigger'
]
```

As article content is rendered markdown, do not attempt to span paragraphs with a `<mark>`.

**This will not work**

```
WASHINGTON — The United States has abruptly ordered China to close its <mark class="s>diplomatic consulate in Houston.

As part of a sharp escalation</mark> in the Trump administration’s moves...

```

**Span paragraphs like this**

```
WASHINGTON — The United States has abruptly ordered China to close its <mark class="s>diplomatic consulate in Houston.</mark>

<mark class="s>As part of a sharp escalation</mark> in the Trump administration’s moves...

```

## Changing Content

### Key Content
`/src/views/components/key/key.component.ejs`

### Hover Content
`/src/views/components/tippy/tippy.component.ejs`

## Changing Hover Behavior 
`/src/views/index.js`

[Tippy Documentation](https://atomiks.github.io/tippyjs/) 

### Changing colors
In `/tailwind.config.js`, see `theme.colors.highlights`.

```bash
module.exports = {
  theme: {
    colors: {
      highlights: {

        hedged: {
          # Full opacity (the Key color)
          "100": "rgba(244, 67, 54, 1)",
          # Transparent (the Mark color) 
          "30": "rgba(244, 67, 54, 0.3)"
        },
        implicative: {
          "100": "rgba(255, 152, 0, 1)",
          "30": "rgba(255, 152, 0, 0.3)"
        },

      }
    }
  }

}
```