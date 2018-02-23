# MyMento
Web project coded in Typescript.

### Technologies
* server : NodeJS, Express
* dev : Gulp, Nodemon
* cms : Node(-mysql)
* front : React, HTML5/CSS3
* test : Mocha, Chai

Full list inside *package.json*

## HOW TO
* Install the packages with **npm install**
* Launch the server with **npm start**
* Test using **npm test**

If the configuration is not setup server side, it will exit at startup. Check class DBI **dbi.ts** for details.

## INFOS
### **gulp** : used to to create *.js* with *.ts*.

Schedule tasks.

If the server can't find the *.js* file, **npm install -g gulp** then **gulp** at the root of the project.

## DEV
* Preferably create a folder per use (i.e. : *pages*, *logic*... inside **src**).
* For the API, create new routes on *src/app.ts*, inside the *routes* function.
* Files should be found by the scripts, otherwise add your own inside **gulpfile.js** preferably called by npm, i.e. inside **package.json**.
