'use strict';

var Sequelize = require('sequelize');
var databaseURI = 'postgres://localhost:5432/journey';

var db = new Sequelize(databaseURI, {
  define: {
    timestamps: false,
    underscored: true
  }
});

var User = db.define('user', {
  name: {
  	type: Sequelize.INTEGER
  },
  source: {
  	type: Sequelize.STRING
  }
});

var Journey = db.define('journey', {
	name: {
		type: Sequelize.STRING
	},
	source: {
		type: Sequelize.STRING
	}
});

var Post = db.define('post', {
	fbpostid: {
		type: Sequelize.STRING
	},
	journeyid: {
		type: Sequelize.INTEGER,
	},
	story: {
		type: Sequelize.TEXT,
		defaultValue: null
	},
	message: {
		type: Sequelize.TEXT,
		defaultValue: null
	},
	source: {
		type: Sequelize.STRING,
		defaultValue: null
	},
	country: {
		type: Sequelize.STRING
	},
	created: {
		type: Sequelize.DATE,
	},
	likes: {
		type: Sequelize.INTEGER
	}
});

// One User has many Journeys 
User.hasMany(Journey);
Journey.belongsTo(User);

var JourneyPost = db.define('journeypost', {
	order: {
		type: Sequelize.INTEGER,
		defaultValue: null
	}
})

// Each country can have many posts
Journey.belongsToMany(Post, {through: 'journeypost'});
Post.belongsToMany(Journey, {through: 'journeypost'});

module.exports = db;
