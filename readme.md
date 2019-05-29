# Instructions

- Run ```npm install``` to install dependencies
- Run ```npm start``` to check the project (default port is 8000)

At the start of my system design, I was considered to use a React and a database to achieve this project.
Then, I realized the Front-end directly talk to the database is not a good idea to design the system.
I used the Node.js to build the backend, and use MongoDB be my database. I put a lot effect on building the database.


I do consider hash is not the perfect way to solve this. I use a random method to generate a unique ID.
1. The original URL md5 has 32-digital, divide it to 4 sets, every set has 8-digit
2. convert the 8-digit to binary, and only keep the last 30-digit
3. Divide the 30-digit to 6 sets, every set has 5-digial now. Because these digits are binary, covert 5-digit to decimal, the maximum is 31. In this case, every 5-digit can find a caracter in this array: ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o', 'p','q', 'r', 's', 't', 'u', 'v', 'w', 'x','y', 'z', '0', '1', '2', '3', '4', '5'). We have got a 6-digit now
4. The whole md5 can have 4 sets 6-digit. Randomly picks one of the four can become the short URL of the original URL.


### Because I am using JavaScript, I use CryptoJS to generate the md5.

### I do consider there are some improvement, and I would love to talk with you about this project in more detail.