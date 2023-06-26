# Individual Project
![Landing](https://github.com/Squiffles/Food_website/assets/124189324/4375ff96-b976-41fb-a89a-03a8970cdcd5)
![Home](https://github.com/Squiffles/Food_website/assets/124189324/137ee66f-393f-46fb-a070-805dd3c843d5)
![Recipe DB](https://github.com/Squiffles/Food_website/assets/124189324/c957cc38-1976-49ca-a988-308093610b94)
![Form](https://github.com/Squiffles/Food_website/assets/124189324/b2592254-735f-49cf-af9f-50bf94f8d035)


# Objective
Develop a recipes website that fetches information from an API: [![Spoonacular](https://img.shields.io/badge/spoonacular-%23FFBF00.svg?style=for-the-badge)](https://spoonacular.com/food-api) processes it in a way that the client can visualize recipe information in paginated form, making it easier for the user to navigate through the website.

On the server side, I managed to consolidate the necessary routes to:

✅ Search recipes by name and ID through the API and DB.

✅ Create new recipes in the DB.

✅ Delete the created recipes.

This information is then stored in the database and sent to the client for proper visualization.


The user has the option to:

✅ Filter recipes by 10 different diets or by origin (from the API or user's own recipes) and sort them by name or health score.
 
✅ Perform a search by name and apply the filters and sorting to the search results.

✅ Create their own recipe through a JavaScript-controlled form.

✅ Delete the recipes they have created.

# Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

# Installation
## 1. Clone the repository
```javascript
https://github.com/Squiffles/Food_website.git
```
## 2. Install dependencies
Run the following command in the 'client' and 'api' directories:
```javascript
npm install
```
## 3. Install PostgreSQL
You can download it from https://www.postgresql.org/download/
## 4. Create a ```.env``` file
Create a ```.env``` in the api directory. Add the next variables according to your configuration:
```javascript
DB_USER=DB_USER // change it to your database username.
DB_PASSWORD=DB_PASSWORD // change it to your database password.
DB_HOST=DB_HOST // change it to your database hostname.
API_KEY=API_KEY // you can generate your own apikey on https://spoonacular.com/food-api/console#Dashboard.
```
# Running
To launch the aplication run the following command in both, the 'client' and 'api' directories:
```javascript
npm start
```
