// index.js
import express from "express";
import { Sequelize } from "sequelize"; 
import cors  from "cors";  










 
 


const app = express();
 
app.use(cors());
 
const sequelize = new Sequelize({
    dialect: "mysql",
    host: "localhost", // Replace with your actual database host
    username: "root",
    password: "root",
    database: "edenmade",
});

// Sync the model with the database
sequelize.sync({ force: true }).then(() => {
    console.log("Database synced");
});
app.use(express.json());

app.get("/", (req, res) => {
    res.json("hello from backend");
});

app.get("/categories", (req, res) => {
    const q = "SELECT * FROM edenmade.categories;";
    sequelize.query(q, { type: Sequelize.QueryTypes.SELECT })
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Assuming your Sequelize instance is named sequelize
app.get("/recipes", async (req, res) => {
    try {
        const recipes = await sequelize.query("SELECT * FROM edenmade.recipes;", {
            type: Sequelize.QueryTypes.SELECT
        });
        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});app.get("/users", async (req, res) => {
    try {
        const recipes = await sequelize.query("SELECT * FROM edenmade.users;", {
            type: Sequelize.QueryTypes.SELECT
        });
        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/users", async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, address, city, postalCode ,numberOfPeople,numberOfDishesPerWeek} = req.body;

        const query = `
            INSERT INTO Users (firstName, lastName, phoneNumber, address, city, postalCode,numberOfPeople,numberOfDishesPerWeek, createdAt, updatedAt)
            VALUES (:firstName, :lastName, :phoneNumber, :address, :city, :postalCode ,numberOfPeople,numberOfDishesPerWeek,NOW(), NOW())
        `;

        await sequelize.query(query, {
            replacements: {
                firstName,
                lastName,
                phoneNumber,
                address,
                city,
                postalCode,numberOfPeople,numberOfDishesPerWeek
            },
            type: Sequelize.QueryTypes.INSERT,
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(8800, () => {
    console.log("Connected");
});



// import express from "express";
// import { Sequelize } from "sequelize"; 
// import Category from "../models/Categories.js"; 

// const app = express();

// const sequelize = new Sequelize({
//     dialect: "mysql",
//     host: "",
//     username: "root",
//     password: "root",
//     database: "edenmade",
// });

 
// sequelize.sync({ force: true }).then(() => {
//     console.log("Database synced");
// });


// app.get("/", (req, res) => {
//     res.json("hello from backend");
// });
// app.get("/categories",(req,res)=>{
//     const q ="SELECT * FROM edenmade.categories;"
//     db.query(q,(err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })

// })
 
 

// app.listen(8800, () => {
//     console.log("Connected");
// });


// npx sequelize-cli db:seed:all
// npx sequelize-cli seed:generate --name demo-recipies
// npx sequelize-cli db:migrate
// npx sequelize-cli migration:generate --name create-recipes 