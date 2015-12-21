var db      = require('../db.js');
var Promise = require('bluebird');
var Users   = require('./Users');

var Users   = module.exports = {

    getAllFriends : function(){
        return db('Friends').select('*')
        .then(function (data) {
            console.log("All Friends in user table: ", data)
            return data;
        })
    },

    getFriends : function(id){
        return db('Friends').select('*').where({ user_id: id })
        .then(function (data) {
            return data;
        })
    },

    addFriend : function(attrs){
        attrs.created_at = new Date();
        return db('Friends').insert(attrs).return(attrs);
    },

    // update:
    // Every Knex query returns an array of objects
    // If affectedCount (array of objects) is empty => return an Error
    // If not => return attrs => updateOrCreate will catch attrs and pass it into createUser
    update: function (attrs) {
        attrs.updated_at = new Date();
        return db('Friends').update(attrs).where({ id: attrs.uid })
          .then(function(affectedCount) {
            return (affectedCount === 0) ? Promise.reject(new Error('not_found')) : attrs;
          });
    },

    updateOrCreate : function(attrs){
        return Friends.update(attrs).catch(Friends.addFriend(attrs));
    }
}