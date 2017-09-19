# my-post-and-parameter-writer

Built with:
- React JS (create-react-app)
- Node JS
- Express
- MongoDB (with Mongoose)
- Docker (For virtualization)

# Purpose
This will allow you to fill in different parameters, then have those put into auto generated posts with parameters. 

# Example Usage
parameter 1: company
input 1: Example Company 1

Post 1 Raw: "Check out {{company}}'s facebook for more useful information!"
Post 1 Final: "Check out Example Company 1's facebook for more useful information!"

# Before Using
(Note: If you use docker you will need to change the url appropriately)
1. Fill in your mongoDB data into the MongoDB url inside the server.js
2. 'NPM Install' to install dependencies
3. 'NPM start' to run react front end and transpiler
4. 'Nodemon server.js' to run backend node server (or 'Node server.js') 
