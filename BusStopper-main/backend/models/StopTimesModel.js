const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const TripModel = require('./TripsModel');
const StopModel = require('./StopModel');

const StopTimesModel = sequelize.define('StopTime', {
    trip_id: { type: DataTypes.STRING, primaryKey: true },
    stop_id: { type: DataTypes.STRING, primaryKey: true },
    stop_sequence: { type: DataTypes.INTEGER, primaryKey: true },
    arrival_time: { type: DataTypes.TIME },
    departure_time: { type: DataTypes.TIME },
    pickup_type: { type: DataTypes.TINYINT },
    drop_off_type: { type: DataTypes.TINYINT }
}, {
    tableName: 'siuanna_stops_times',
    timestamps: false,
    hasPrimaryKeys: true,
    id: false
});

StopTimesModel.belongsTo(TripModel, { foreignKey: 'trip_id' });
StopTimesModel.belongsTo(StopModel, { foreignKey: 'stop_id' });

module.exports = StopTimesModel;
