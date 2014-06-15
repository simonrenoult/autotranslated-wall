module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('User', {
	    id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		alias: DataTypes.STRING
	},
	{
		classMethods: {
			associate: function(models) {
				User.hasOne(models.Message, {as : "message_owner"})
			}
		}
	}
	);

	return User;
};