# Quiz Manager
## Synoptic Project by Anna Voitika

Quiz Manager is an application built for managing quizzes. Its main functionalities include creation, deletion and editing of quizzes, questions and answers. Not all users will have access to every functionality of the website. User experience will depend on a permission level assigned to a user.  

Users will be registered under one of the following three permission levels:  

1. EDIT: full permissions (view, delete and edit questions and answers)
2. VIEW: lesser permissions (view questions and answers)
3. RESTRICTED: minimal permissions (view questions)

# Tech Stack
- Javascript
- Node.js
- Jade
- CSS
- MongoDB
- Express
- Mongoose
- Bootstrap

# How to run the application  

**If you are accessing Quiz Manager from github repository, go to step _"Clone the application"_. Otherwise, you can skip that step.**  

### Clone the application

Please clone the code from this repository to your local machine.  
Then, using terminal, find the directory where the project was cloned.  
To enter the project directory, you can use the following terminal command:  
```cd folder-where-you-cloned-the-project```

Within that folder, access the project directory:  
```cd Anna-Voitika-SP```

### Start the application

Run the following command in your terminal to install dependencies:  
```npm i```

Run the following command in your terminal to start the application:  
```npm run start```

If you have something else running on port 3000, please stop that process by running the command:  
```npx kill-port 3000```

### Run end-to-end tests

To run end-to-end Cypress tests, use the following command in the terminal:  
```npm run cypress```

# User credentials  

Please use usernames and passwords below to log in after you start Quiz Manager application.  

- For edit permission user:  
username: editaccess  
password: 123  

- For view permission user:  
username: viewaccess  
password: 123  

- For restricted permission user:  
username: restricted  
password: 123  