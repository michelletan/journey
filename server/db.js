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
		allowNull: false
	},
	country: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

var Journey = db.define('journey', {
	country: {
		type: Sequelize.STRING
	},
	source: {
		type: Sequelize.STRING
	}
});


// One-to-many
User.hasMany(Journey);
Journey.belongsTo(User);

// Many-to-many
Journey.belongsToMany(Post, {through: 'journeyPost'});
Post.belongsToMany(Journey, {through: 'journeyPost'});

module.exports = {
	db: db,
	models: {
		User: User,
		Post: Post,
		Journey: Journey
	}
};
