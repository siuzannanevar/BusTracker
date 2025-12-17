const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const RouteModel = sequelize.define('Route', {
    route_id: { type: DataTypes.STRING, primaryKey: true }, 
    agency_id: { type: DataTypes.STRING },
    route_short_name: { type: DataTypes.STRING },
    route_long_name: { type: DataTypes.STRING },
    route_type: { type: DataTypes.INTEGER },
    competent_authority: { type: DataTypes.STRING },
    route_color: { type: DataTypes.STRING },
    route_desc: { type: DataTypes.TEXT }
}, {
    tableName: 'siuzanna_stops_routes',
    timestamps: false
});

module.exports = RouteModel;
