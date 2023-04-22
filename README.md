# Full Stack Assignment

This repository contains the nodejs API server codes for the assignment.

## Instructions to run locally

In the project directory, you can run:

### `npm run start:local`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.

## Publicly hosted URL

You can find both the react application and nodejs API application at http://ec2-54-251-43-37.ap-southeast-1.compute.amazonaws.com.

## Assumptions

1. For common text field like name, regex should only contain A-Z, a-z, spaces and -.
2. For mobile text field, only number inputs are allowed. Number has to start with 6, 8 or 9 and has to be 8 characters long.
3. For emails, they have to fit the typical email validation as per https://www.w3resource.com/javascript/form/email-validation.php.
4. Added in new API for loading list of unassigned teachers, which will help make the application more user friendly.
5. For API errors, there will only be a generic error message pertaining to each API that returns to the request server. For further details, to refer to the logs of the nodejs API server as we do not want to leak out specific information for security purposes.