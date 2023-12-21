// index.js
import express from "express";
import { Sequelize } from "sequelize"; 
import cors  from "cors";  
import User from "./models/User.js"; 
import UsersCategories from "./models/userscategories.js"  
import OrderDetails from "./models/OrderDetailssss.js"

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
      const {
        firstName,
        lastName,
        phoneNumber,
        address,
        city,
        postalCode,
        numberOfPeople,
        numberOfDishesPerWeek,
        categories,
        email,
      } = req.body;
  
      // Create a new user
      const newUser = await User.create({
        firstName,
        lastName,
        phoneNumber,
        address,
        city,
        postalCode,
        numberOfPeople,
        numberOfDishesPerWeek,email
      });
  
      // Associate the user with multiple categories
      if (categories && categories.length > 0) {
        await Promise.all(
          categories.map(async (categoryId) => {
            await UsersCategories.create({
              userId: newUser.id,
              categoryId,
            });
          })
        );
  
        // Create order details with random recipes based on selected categories
        // const orderDetails = await generateOrderDetails(newUser.id, categories, numberOfDishesPerWeek);
             // Retrieve associated recipes for the selected categories
      const recipes = await sequelize.query(
        `SELECT Recipes.* FROM Recipes
          JOIN Categories ON Recipes.categoryId = Categories.id
          JOIN UsersCategories ON UsersCategories.categoryId = Categories.id
          WHERE UsersCategories.userId = :userId`,
        {
          replacements: { userId: newUser.id },
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      console.log("@@@recipes",recipes)
      const shuffledRecipes = recipes.sort(() => 1 - Math.random());
      const selectedRecipes = shuffledRecipes.slice(0, numberOfDishesPerWeek);
      await Promise.all(
        selectedRecipes.map(async (recipe) => {
          // Create order details using recipe.id and any other relevant information
          await OrderDetails.create({
            userId: newUser.id,
            recipeId: recipe.id,
            email: email,
            // Add other relevant fields here
          }); 
        const deliveryDate = new Date();
              deliveryDate.setDate(deliveryDate.getDate() + 5);
          
        })
        
      );
      
      
      console.log("11@@@",selectedRecipes)
        res.status(201).json({ message: "User created successfully" });
      } else {
        res.status(400).json({ error: "Categories are required" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  // ... (your existing imports)

  // app.post("/getUserOrderDetails", async (req, res) => {
  //   try {
  //     const { email } = req.body;
  
  //     // Execute the raw SQL query using sequelize.query
  //     const data = await sequelize.query(
  //       'SELECT * FROM edenmade.orderdetails WHERE email = :email',
  //       {
  //         replacements: { email: email },
  //         type: Sequelize.QueryTypes.SELECT,
  //       }
  //     );
  
  //     // Send the fetched data in the response
  //     res.status(200).json({ data: data });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });
  app.post("/getUserOrderDetails", async (req, res) => {
    try {
      const { email } = req.body;
  
      // Execute the raw SQL query using sequelize.query
      const data = await sequelize.query(
        'SELECT OrderDetails.*, Recipes.title as recipeName, Categories.name as categoryName ' +
        'FROM OrderDetails ' +
        'INNER JOIN Recipes ON OrderDetails.recipeId = Recipes.id ' +
        'INNER JOIN Categories ON Recipes.categoryId = Categories.id ' +
        'WHERE OrderDetails.email = :email',
        {
          replacements: { email: email },
          type: Sequelize.QueryTypes.SELECT,
        }
      );
  
      // Send the fetched data in the response
      res.status(200).json({ data: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

// ... (rest of your existing code)

  
  
  
  // Function to get a random recipe ID based on categories
  
// app.post("/users", async (req, res) => {
//     try {
//         const {
//             firstName,
//             lastName,
//             phoneNumber,
//             address,
//             city,
//             postalCode,
//             numberOfPeople,
//             numberOfDishesPerWeek,
//             categories, // Assuming categories is an array of category IDs
//         } = req.body;

//         // Create a new user
//         const newUser = await User.create({
//             firstName,
//             lastName,
//             phoneNumber,
//             address,
//             city,
//             postalCode,
//             numberOfPeople,
//             numberOfDishesPerWeek,
//         });

//         // Associate the user with multiple categories
//         if (categories && categories.length > 0) {
//             await Promise.all(
//                 categories.map(async (categoryId) => {
//                     await UsersCategories.create({
//                         userId: newUser.id,
//                         categoryId,
//                     });
//                 })
//             );
//         }

//         res.status(201).json({ message: "User created successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
 

app.listen(8800, () => {
    console.log("Connected");
});


