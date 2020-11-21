const orm = require("../config/orm");


const burger = {
    selectAll: (cb) => {
      orm.selectAll("burgers", (res) => {
        cb(res);
      });
    },
    insertOne: (name, digesting, cb) => {
        orm.insertOne(name, digesting, (res) => {
            cb(res);
        });
    },

    updateOne: (digesting, nameToUpdate, cb) => {
        orm.updateOne(digesting, nameToUpdate, (res) => {
            cb(res);
        });
    },

    delete: (condition, cb) => {
        orm.delete(condition, (res) => {
            cb(res);
        });
    }

  };

module.exports = burger;