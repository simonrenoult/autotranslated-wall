var Sequelize = require('sequelize');

module.exports = function (sequelizeInstance) {
	return sequelizeInstance.define('User', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		email: {
			type: Sequelize.STRING,
			validate: {
				isEmail: true
			}
		},
		password: Sequelize.STRING,
		firstname: Sequelize.STRING,
		lastname: Sequelize.STRING,
	});
};