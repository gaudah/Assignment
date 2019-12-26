# Assignment
Assignment -> User has post mapping - 26/12/19
Back end - Nodejs(Hapi)
DB - Mongodb
Problem statement - 
1. Built an app with following functionalities.
a. Login : 
i. User can sign up
ii. User can login
iii. User can logout

b. Details of a person :
i. Add details
ii. Modify details
iii. Delete details
iv. Get all details

c. User can create a Post: 

d. Post will have following functionalities :
i. Post verification will be done automatically
ii. Post will not contain CAPITAL words, this will be verification criteria.

# Prerequisite:
  npm should be installed

# Commands to run the application
  npm install           
 
  npm start or node server.js

# Docker commands to build docker image and run the container
sudo docker build -t dockerimage .
sudo docker run -p 9000:9000 --net host -d --name test_endpoints dockerimage
