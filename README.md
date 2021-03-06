# Shopping Cart

This app tries to simulate a shopping bag feature. User is presented to a product pool where he/she can choose any of them and add it to the bag. Later on, the bag content can be verified and items can also be removed. The total value is always updated.

The app was built using pure JQuery and Twitter Bootstrap.

A third-part API is being consumed.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisities

You need to have node previously installed in your local

```
https://nodejs.org/en/download/
```

### Installing

First step is to install clone the repository by typing

```
git clone https://github.com/eduardo305/shoppingcart.git
```
After conplete, go inside the project you've just cloned

```
cd shoppingcart
```

Now use npm to install all dependencies

```
npm install
```

After installing all dependencies, you are good to go. Just run the following command and the server will be up and running at port 8080:

```
npm start
```

Now, just open your browse (Chrome, if possible) and run

```
localhost:8080
```

## Running the tests

Tests were not implemented. Only the main structure was added for future work.

### How to run the tests

Make sure you have grunt installed. If you don't, run the following command

```
npm install -g grunt-cli
```

After that, you can run the tests by executing the following command:

```
grunt jasmine
```

### Known issues

* The DELETE product flow may not work properly. The product can be excluded from the bag normally, however the app may not fetch the bag items right next removing an item. The fetch shoppingcart request sometimes keeps pending for a long time, so I have added a timeout of 2s so it can be aborted.
I have worked around this issue by tackling the DOM directly, which is not a good approach. Although it is not a good practice, I left the code commented out for verification in case it happens.
The files are: app.js (line 72) and bag.js (lines 81 and 118).

* The API doesn't bring back an absolute url for the product images. To workaround this issue, I hardcoded the product images so they can be displayed at the product pool page.

* The POST and DELETE requests are being handled on the error handler, because this is a cross-domain request and they are not retrieving anything on the response body (just a status is being returned). When this scenario happens, the browser understands that an error has happened.


### Next steps

* Implement the Jasmine tests properly
* Handle request erros properly. Display friendly error messages and/or redirect the user to an error page
* Turn the app into a SPA
* Fix the POST and DELETE issue (in case the API gets updated)
* Implement one version using ReactJS
