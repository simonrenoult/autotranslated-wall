module.exports = function (sequelize, DataTypes) {
	var Language = sequelize.define('Language', {
	    name: DataTypes.STRING,
	    short_name: DataTypes.STRING,
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
	},
	{
		classMethods: {
			associate: function(models) {
				Language.hasOne(models.User, {as : "preferred_language"});
				Language.hasOne(models.Message, {as: "message_langgague"});
			}
		}
	});

	return Language;
};
