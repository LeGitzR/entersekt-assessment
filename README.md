# Todo list exercise

### Install

- Install https://nodejs.org/en/
- Download archive from link provided
- Unzip file and cd into it
- run `npm install`

### Run
`node app.js`

Visit http://localhost:8080 in your browser

### High level application requirements
1. Multiple users should be able to view the shared public todo list
2. Should be able to add items
3. Should be able to delete items
4. Should be able to edit items (Missing feature)
5. Must be able to deploy in docker (Missing feature)

### Tasks
1. Add missing requirement #4 to the application
2. Add sufficient test coverage to the application and update readme on howto run the tests
3. Add missing requirement #5 to the application (Dockerfile and update readme with instructions)

### Bonus
4. Display test coverage after tests are executed
5. Find and fix the XSS vulnerability in the application. Also make sure that it wont happen again by including a test.

> ### Notes
> - Update the code as needed and document what you have done in the readme below
> - Will be nice if you can git tag the tasks by number

### Solution
Task 1: To edit click the pencil icon next to the todo item, this will load the
item text into the text box for edit and delete the value from the current todolist.

Task 2: To run the tests, just run npm test

Task 3: To deploy the docker just run "docker-compose up" (run "docker-compose build" if it hasnt been built yet)

Task 4: I tried to get mocha working in the browser to be accessed via GET /test
but was unsuccessful. Just run npm test or mocha test to run the tests and display the
test coverage.

Task 5: The input box is susceptible to malicous tags in the text. To ensure this does not
happen again i included Caja HTML Sanitizer to strip malicous tags from the input string.
Could not test since I struggled to access the values inside the todolist array.. I tied using chai-dom but was unsuccessful.


