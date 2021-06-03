const knex = require("./knex");

const enterEmail = (email) => {
  return knex("emails")
    .insert(email)
    .then((data) => {
      return { success: true, id: data[0] };
    })
    .catch((err) => {
      return { success: false };
    });
};

const fetchEmails = () => {
  return knex("emails")
    .select("*")
    .then((data) => {
      return { success: true, data: data };
    })
    .catch((error) => {
      return { success: false };
    });
};

module.exports = { enterEmail, fetchEmails };
