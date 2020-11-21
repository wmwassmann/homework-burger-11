const connection = require('./connection.js');

const orm = {
    // Function to pull all burgers from the database
    selectAll: function(table, cb) {
      let queryString = "SELECT * FROM " + table + ";";
      connection.query(queryString, (err, result) => {
        if (err) throw err;
        cb(result);
      });
    },

    // Function that adds a nwe burger to the database
    insertOne: function(name, digesting, cb) {
        let queryString = `INSERT INTO burgers (burger_name, digesting) VALUES (?, ?)`
        console.log(queryString);
        name.toString();
        connection.query(queryString, [name, digesting], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },

    // Function that changes the devour boolean for a specific burger name
    updateOne: function(digesting, condition, cb) {
        // It has to be broken up this way to prevent truncated sql errors, ie; values inside single quotes within the query which does not work
        let queryString = "UPDATE burgers SET digesting = "
        queryString += digesting;
        queryString += ' WHERE '
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    // Function to delete a burger
    delete: function(condition, cb) {
        let queryString = "DELETE FROM burgers WHERE "
        queryString += condition;
        console.log(queryString);
    
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }

};

module.exports = orm;