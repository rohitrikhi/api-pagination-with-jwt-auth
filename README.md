# api-pagination-with-jwt-auth
API that returns the project names upon authentication based on user role in a paginated manner.

# Follow these steps carefully
--> Clone and npm install  

--> Set the .env variable MONGO_URI to mongodb database uri and ACCESS_TOKEN_SECRET to some random 64 character gibberish

--> Use postman or any other api client go to /register and register a user with the following body parameters: name,email,designation & password  

--> use the designation = 'manager' for the access to the /projects route  

--> go to the /login route and login with body parameters email & password  

--> you will get a bearer token if authentication is successfull, it will be valid for 15 min.  

--> use the bearer token to get access to the /projects route, if using postman click on auth and select type bearer token, paste the token you got into the field  

--> /projects route expects a query strings 'page' and 'limit'  

--> Like this https://localhost:3000/projects?page=1&limit=1  

--> Upon request you shall get a paginated response depending upon the limit for per page item.  

--> Consider inserting more documents for better idea of the working, or clone existing documents.  

--> See the attached PDF to know why this repo exists [Node Assignment_1.pdf](https://github.com/rohitrikhi/api-pagination-with-jwt-auth/files/8589241/Node.Assignment_1.pdf)
