I have created a fullstack app with React, Node.js Express and sqlite3.
This is the Frontend of the app.
The backend is [Here](https://github.com/mp-intelligo/express-server).

### How to run?

To run in development mode, clone the 2 repositories and hit `npm start` in both.

For production mode, the app is intended to be served completely from the express server.
* `npm run build` in the [Backend repository](https://github.com/mp-intelligo/express-server)
* `npm run build` here
* Move the newly created `build` directory to the backend repo under the folder `bin`
* `cd` to `bin`
* Hit `node index`
 
