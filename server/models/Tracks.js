var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');
var Users   = require('./Users')
var ph = require('./Phish').Phishin();



var Tracks = module.exports = {

    getAllTracks: function() {
        return db('songplayed').select('*')
    },

    getTracksBySongId: function(songId) {
        return db('songplayed').select('songplayed.*', 'shows.date', 'shows.venue_id', 'shows.tour_id', 'venues.name as venue_name', 'venues.latitude', 'venues.longitude', 'venues.location', 'tours.name as tour_name', 'tours.starts_on as tour_starts_on', 'tours.ends_on as tour_ends_on')
        .where('songplayed.song_id', songId)
        .join('shows', 'shows.id', 'songplayed.show_id')
        .join('venues', 'venues.id', 'shows.venue_id')
        .join('tours', 'tours.id', 'shows.tour_id');
    },

    updateOrCreate : function(attrs){
        return Tracks.update(attrs).catch(Tracks.create(attrs));
    },

    update: function (attrs) {
        attrs.updated_at = new Date();
        return db('songplayed').update(attrs).where({ id: attrs.id })
          .then(function(affectedCount) {
            return (affectedCount === 0) ? Promise.reject(new Error('not_found')) : attrs;
          });
    },

    create : function(attrs){
        attrs.created_at = new Date();
        return db('songplayed').insert(attrs).return(attrs);
    }

}