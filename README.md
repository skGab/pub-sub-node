# Project Setup and Usage Instructions

## Initial Setup

After cloning the project repository, you need to install the necessary dependencies. Run the following command in your project's root directory:

npm install

## Running Locally

To start the application in a development environment, execute:

npm run dev

This will launch the server on `localhost` at port `3000`.

## Testing the Application

To test a specific route, send a POST request to `http://localhost:3000/channel1` with a JSON payload. You can do this using tools like Postman or cURL. After sending the request, check the console for output to verify the route's functionality.

## Running Tests

Before running tests, it's necessary to build the project. Use the following command for building:

npm run build

After the build is complete, you can execute tests for specific files. From the root of the application, run:

node tests/<file_name>.test.mjs

Replace `<file_name>` with the actual name of the test file you wish to run.
