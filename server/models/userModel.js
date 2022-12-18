import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

import Thought from "../models/thoughtModel.js"

const User = sequelize.define("User", {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
})

User.hasMany(Thought, {
    foreignKey: "userID"
})
Thought.belongsTo(User)

await User.sync()

export default User