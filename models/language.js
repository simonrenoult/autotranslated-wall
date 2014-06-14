var Sequelize = require("sequelize");

module.exports = function (sequelizeInstance) {
	return sequelizeInstance.define('Language', {
	    name: Sequelize.STRING,
	    short_name: Sequelize.STRING
	});
};
