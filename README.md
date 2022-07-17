# PlayerToo

PlayerToo is a social platform for finding other people interested in the same multiplayer video games. 

**Link to project:** This Site is not live yet

![PlayerToo Logo](https://user-images.githubusercontent.com/97214996/179373125-dd7aebc9-e686-467e-8a09-6ea64c7fbae0.png)


## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node, Express, MongoDB, Passport, React, EJS

This is a full stack CRUD app that allows you to find other players for multiplayer games. I wanted to create a platform that allows you to sort by age group, languages spoken, and hours in the game. The authentication method that I chose was Discord's OAuth2 authentication. The database used is MongoDB with Mongoose as the ODM. I am using a standard MVC architecture to keep everything organized. Passport is the authentication handler. I am using the RAWG API for the database of video games and using the slug to link the users in MongoDB. I am adding React at the moment. If anybody would like to try out my web-app, you will have to set up the files in the config folder. It contains the .env, config.js, and the passport.js files. You will need the client secret and client name for passport as well as an api key from RAWG. The database string should be entered into the .env file as well as the port you will be using.
## Optimizations

There is still a decent ways to go. I am currently using EJS for the front-end, but am in the process of changing over to React.js. I still have a lot of design choices ahead of me, and most of what you see on the front-end will be changing. 
## Lessons Learned:

I have deepened my understanding of authentication and React most of all. I started out by fully typing out the routes for authentication manually without passport. This let me fully appreciate all that passport does for us even though the documentation is a bit lacking. 

## Examples:
Take a look at these examples that I have in my own portfolio:

**Full Stack Todo List** https://github.com/Hazelwize/todo-list

**First iteration of PlayerToo** https://github.com/Hazelwize/player-too

**Stitch-N-Loop API:** https://github.com/Hazelwize/stitch-and-loop-api



