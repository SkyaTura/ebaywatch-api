# eBaywatch

> A simple proof of concept of an ebay pricing scrapper and notifier

## Installation

### With Docker
``` bash
# Start the project
docker-compose up -d --build
```

### Important

If you want to enable the mail sender, you'll to create a free account at [Mailgun](https://mailgun.com) and define the `MAILGUN_API_KEY` and `MAILGUN_DOMAIN` environmental variables.
Tip: you can also use `.env` files in development mode

## Development

``` bash
# Start the database
$ docker-compose up -d mongo mongo-express

# Create the .env file
$ cp .env.example .env

# install dependencies
$ npm install

# serve with hot reload at localhost:4000
$ npm run dev
```

## What was used here
- [Hapi](https://hapijs.com/) for building the application services
- [Hapi-CORS](https://www.npmjs.com/package/hapi-cors) for handling CORS headers
- [Hapi-octopus](https://github.com/ar4mirez/hapi-octopus) for autoloading routes
- [Mongoose](https://mongoosejs.com/) for DB modeling
- [Mailgun](https://mailgun.com) for sending emails
- [Node-cron](https://www.npmjs.com/package/node-cron) for scheduling tasks
- [scrape-it](https://github.com/IonicaBizau/scrape-it) for scrapping ebay results
- [dotenv](https://www.npmjs.com/package/dotenv) for environmental variables loading from file

## Project Patterns
- [AirBnb's JavaScript Style Guide](https://github.com/airbnb/javascript) as base styleguide
- [Vue.js Style Guide](https://vuejs.org/v2/style-guide/) (all recommended rules)
- [Git Flow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) as branching standard

## Usage flow
### Receive periodic emails
- Access the project app
- Type something on the search bar
- Check if the search result pleases you
- Click in the "Track prices" button
- Insert your personal data to receive periodic emails

### Change your subscriptions or stop receiving emails
- Click on the application menu (top left corner)
- Go to the page "Tracked prices"
- Choose the search term you want to modify and click in the button "Manage subscriptions"
- Change the options on the screen

## Explained architecture choices
### Scrapping over eBay API
Although the eBay's API was mentioned in the test description, wasn't very clear if it was mandatory to be used. So we opted to use a web scrapper for a differential approach example, since API comsumption is too simple. Also, the eBay's search API doesn't always match with the organic site search engine, as it's highlighted in the documentation.

### Mailgun over basic SMTP
We choosed this service because it's easy and simple to use, it doesn't require a dedicated SMTP server or any fancy configuration for just a basic test.

### Code patterns
As mentioned in the test description, we used AirBnb's style guide, but we made some little adjustments of personal preference to improve the code readability. It's important to notice that this changes was only for this test, while we are working on third partie projects we respect 100% of the project specificities.

## Explained Frontend architecture choices

### Vue.js over React
We choosed Vue.js powered by Nuxt over React because it's a much simplier application structure and faster workflow, better for quickly prototyping and also we already have a solid project template for this kind of application.

### Redux usage
As we chose Vue.js, Redux wasn't necessary, because the way Vue manage data is more efficient and less bureaucratic. Although, in Vue we have a Redux equivalent, called Vuex. Even not being needed here, we used the tracking page to demonstrate a little of it's behavior. And is also being used to manage layout global states.
