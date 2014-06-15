module.exports = function (sequelize, DataTypes) {
	var Message = sequelize.define('Message', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		content: DataTypes.STRING
	});

	return Message;
};