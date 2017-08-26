## Express boilerplate

An [Express](https://github.com/expressjs/express) application ready to use, and extend, in seconds!

This is a basic setup and it's intended for making the initial application architecture process much
faster and easier.


#### Setup

1. Clone this repository,
2. install what's needed: `npm i`,
3. copy `.env.sample` to `.env` (change the values, if needed),
4. compile your static assets (from `/source`): `grunt mini` or just `grunt`,
5. run the application: `grunt nodemon *` or `npm start`

\* In order to run [Grunt](https://github.com/gruntjs/grunt) tasks, make sure you have it installed globally, if not then run: `npm i -g grunt-cli`


#### Done

Visit [http://localhost:9000](http://localhost:9000) (Unless you changed the port in the `.env` file)


#### Practice

Take a look at `/app/core/controllers/cities.js` and `/app/core/controllers/users.js`, they both implement some basic CRUD logic. Create a forms in the respective views (`/app/core/views/`) that allow you to create some `users` and `cities`. You can also implement deletion.
Submit a pull request with your ideas and I will provide detailed feedback on your work and progress.

*Happy learning.*


#### Contribute
```
fork https://github.com/aichholzer/ExpressBoilerplate/
```


#### License

[MIT](https://github.com/aichholzer/ExpressBoilerplate/blob/master/LICENSE)
