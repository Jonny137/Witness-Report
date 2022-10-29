## Witness Report
<img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg"
     alt="Markdown Node icon"
     height="50px"
/>&nbsp;&nbsp;&nbsp;
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png"
     alt="Markdown TS icon"
     height="50px"
/>&nbsp;&nbsp;&nbsp;


Witness reporting API service. It processes user request for report, validates it and stores it in server filesystem.

## Prerequisites

Install Node.JS version `^18.` (Due to usage of native Fetch API)

### Usage
 - Rename `.env-template` to `.env` and fill the parameters values
 - Install the dependencies by running: `npm ci`
 - Build the project with following command: `npm build`
 - To run in production mode: `npm start`
 - To run in development mode: `npm run tsdev`

### Documentation
 - To view service documentation (openapi) navigate to `/api-docs` route