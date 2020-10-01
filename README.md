# ACM Website

This repository conatains the code base for the ACM Manipal Website.

## Run On Local System
- Install node (The node version used to build the currently deployed version of the website is 13.11.0)
- It is preferrable to install yarn
- Clone the repo by running :
` git clone https://github.com/acmmanipal/ACM_Website.git`

//AMJ & C0dY were here

- Install dependencies:
```
cd ACM_Website 
npm install
cd client
npm install
```
### For production build:
```
cd client (If not currently in client directory)
yarn build (or npm run build)
```

### Run the application:

### Run only react app:
```
cd client(If not currently in client directory)
npm start
```

### Run the express server:
\
 From ACM_Website directory run

 `npm start`
 
 This serves only the optimized version after running build and will not show any changes made after the previous build. 

### Run both express server and support hot reloading (preferable for development):
\
`yarn dev (or npm run dev) `

## Technology Stack
- MongoDB
- ExpresJS
- ReactJS
- NodeJS

[Materialize CSS](https://materializecss.com/) has been used in the front-end

## Dev Server

The dev version is deployed [here](http://www.dev.manipal.hosting.acm.org/).

## Contribute:

- Fork the repo and raise a PR for 
    - an existing issue
    - raise your own issue
    - suggest a feature

