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
  facebookId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  }
});

var Post = db.define('post', {
	facebookId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		unique: true
	}
});

var Journey = db.define('journey', {
	country: {
		type: Sequelize.STRING
	}
});


// One-to-many
User.hasMany(Journey);
Journey.belongsTo(User);

// Many-to-many
Journey.belongsToMany(Post);
Post.belongsToMany(Journey);

module.exports = {
	db: db,
	model: {
		User: User,
		Post: Post,
		Journey: Journey
	}
};
