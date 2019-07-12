# Want List

This app is a light weight want list and ordering tracker. It allows for entering items and vendors and placing orders.

## Why?

For many small businesses, ordering can be built into the Point of Sale system, but it comes at the cost of inventorying every item and then ensuring that the count stays correct. A fairly monumental task, in the real world. Also, the automation present in most of these systems just put items on the list that are out. This means out of season, discontinued, or just unpopular items may be added when they are not wanted.

This app allows allows the user to enter and keep information on vendors, add items to the want list as needed and then place and track orders in a straight forward manner.

## Development mode

Requirements - MongoDB, node.js, and Angular.  

This project uses [Node Foreman](https://www.npmjs.com/package/foreman) to start the angular and express servers in development mode. They are included in the dev dependencies, so there is no need to load them.  

With a running MongoDB server, you can start the app with `nf start` for a dev server. The app will automatically open in the browser once the servers have started. The app will automatically reload if you change any of the source files.  

## Structure of code

The `server` folder contains all the code used by `server.js` for the backend express server. The `src/app` folder contains all the angular components and services along with the mongoose models.
