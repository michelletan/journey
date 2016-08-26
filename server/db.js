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
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true
  }
});


var Journey = db.define('journey', {
	name: {
		type: Sequelize.STRING
	}
});

var Country = db.define('country', {
	name: {
		type: Sequelize.STRING
	},
	source: {
		type: Sequelize.STRING
	}
});

var Post = db.define('post', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		unique: true,
		primaryKey: true
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
	created: {
		type: Sequelize.DATE,
	}
});

// One User has many Journeys 
User.hasMany(Journey);
Journey.belongsTo(User);

// One Journey has many Countries
Journey.hasMany(Country);
Country.belongsTo(Journey);

// Each country can have many posts
Country.belongsToMany(Post, {through: 'countrypost'});
Post.belongsToMany(Country, {through: 'countrypost'});

module.exports = db;
