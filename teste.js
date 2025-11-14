const bcrypt = require('bcryptjs');

console.log(
  bcrypt.compareSync("123456", "$2a$10$Y8Z2IEJECJGTwXJKlnoy0u5.X98JUPk5yJ3eeDHytpqt9S1P36wWy")
);