module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('User', {
	    id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		},
		password: DataTypes.STRING,
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING
	});

	return User;
};