# ![Trans Lifeline](public/docs/TLLlogo.png)

# Trans Lifeline

[Trans Lifeline](http://www.translifeline.org)'s public facing website.

## Installation
### 1. Clone the repository.
```
$> git clone https://github.com/TransLifeline/translifeline-home.git
```
### 2. Set environment variables.
Set MONGODB_URI to your MongoDb connnection url.

For email subscriptions, set MAILCHIMP_KEY to your mailchimp key and MAILCHIMP_LIST_ID to the id of the mailchimp email list.

For fundraising campaign progress, set MOONCLERK_TOKEN
### 3. Install dependencies.
```
$> npm install
```

### 4. Start.
```
$> npm start
```
You can also start the app in developer mode to watch for changes and livereload.

```
$> npm run start-dev
```

## License

Copyright (c) 2016 Trans Lifeline.

Licensed under the [MIT license](LICENSE).
