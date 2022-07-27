# Wefox Node.js Challenge

## Introduction:
* I have chosen to use NestJs framework which uses express.js under the hood,
algo can be used with fastify it you desire.
* Why have I chosen NestJS Over plain express?
  - Typescript configured by itself.
  - Avoid external third party dependencies. NestJs provide the most
  features you need to develop an application.
  - Dependency Injection, It's fantastic tool for accomplish the 
  `Dependency Inversion` of Solid principles.
  - Cqrs library easy to use focused on microservices, scheduler, among other.
  - Official site: `https://docs.nestjs.com/`

## Specifications:
* Node.js 18
* Typescript
* Whole application id dockerized: `Node.js, Mongo, Redis`.
* Express server used by Nest.
* MongoDb using Mongoose.
* Redis for caching.
* I tried to use RabbitMq for modules communication, but finally I let it 
aside because as I said earliest I hadn't enough time.

## Application architecture:
* I tried to use a kind of clean architecture, using application, infrastructure, 
and domain layer. I couldn't fulfill as I wanted due time reasons.

## Requirements:
* Login: There're two ways to login:
  * Register a user in the endpoint `http://localhost:3000/user` by a `POST`
  request with a body of email and password fields. Therefore, to login
  send a `POST` request to the endpoint `http://localhost:3000/auth/login`
  with your email and password that you've used in the registration.
    * If the authentication goes well, you'll get your `x-access-token`
    with a duration of 10 hours in the response header: `x-access-token`
  * Go to the endpoint `http://localhost:3000/auth/google` and select your 
  desired Google account to login. You'll get a response of accessToken with
  your `x-access-token` with a duration of 10 hours.
* Check address:
  * By a get request to `http://localhost:3000/address` with the required
  query parameters you'll get your location if it exists in Google Maps Api.
* Check Weather:
  * By a get request to `http://localhost:3000/weather` with the required
  query parameters you'll get the weather from your requested location if it
  exists in Google Maps Api.
* Caching:
  * Both calls `http://localhost:3000/address` and `http://localhost:3000/address`
  are cached whiting 10 hours in the redis container. I've cached manually,
  but it could be cached by NestJs itself.
* Testing?:
  * I'm afraid I could not test any functionalities more those that NestJs provides
  by default. By the way, if you give me more time I could test the whole
  application. I've using Jest for unit testing, Cypress for E2E testing.
* Security:
  * I Restricted the get endpoint to be authenticated, unless your use a
  custom decorator called `ForceAuth()` so it'll be protected by `x-access-token`
* Swagger Api:
  * You'll find in this url `http://localhost:3000/api`

### Notes:
* I'll let my google Oauth2 credential, so you could test that functionality.
* Regarding Google Maps and Open Weather Api, I'll send the keys through the assignment.

### Finally
* Thanks for this opportunity, I've found this technical so interesting,
and I've really enjoyed developing this.