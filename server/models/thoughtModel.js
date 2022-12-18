import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";


const Thought = sequelize.define("Thought", {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},

    {
        timestamps: true,
    }
)

await Thought.sync()

export default Thought