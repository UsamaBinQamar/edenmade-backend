// index.js
import express from "express";
import { Sequelize } from "sequelize"; 
import cors  from "cors";  
import User from "./models/User.js"; 
import UsersCategories from "./models/userscategories.js"  
import OrderDetails from "./models/orderdetails.js"
import UserOrderRecipes from "./models/userorderrecipes.js"
import Recipes from "./models/Recipes.js";
import Category from "./models/Categories.js";


const app = express();
 
app.use(cors());
 
const sequelize = new Sequelize({
    dialect: "mysql",
    host: "localhost" , // Replace with your actual database host
    username: "root",
    password: "root",
    database: "edenmade", 
}); 
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
});
app.get("/users", async (req, res) => {
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
          email,
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
          

          const shuffledRecipes = recipes.sort(() => 1 - Math.random());
          console.log("@@@",shuffledRecipes)
          function addDays(date, days) {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
          }
          
          
         // Create 6 OrderDetails records
     // Create OrderDetails records based on numberOfDishesPerWeek
const orderDetailsPromises = Array.from({ length: 6 }, (_, i) => {
    const deliveryDate = addDays(new Date(), 7 * (i + 1)); // Add 7 days for each order starting from the next week

    return OrderDetails.create({
      userId: newUser.id,
      numberOfPeople: req.body.numberOfPeople,
      recipesPerWeek: req.body.numberOfDishesPerWeek,
      deliveryDate:deliveryDate
 });
  });
  
  const createdOrderDetails = await Promise.all(orderDetailsPromises);
  
  // Create UserOrderRecipes records for each orderDetail and each recipe
  const userOrderRecipesPromises = createdOrderDetails.flatMap((orderDetail, i) => {
    return Array.from({ length: req.body.numberOfDishesPerWeek }, (_, j) => {
      return UserOrderRecipes.create({
        userId: newUser.id,
        recipeId: shuffledRecipes[j].id, // Adjust based on your actual structure
        categoryId: shuffledRecipes[j].categoryId, // Adjust based on your actual structure
        orderDetailId: orderDetail.id,
      });
    });
  });
          await Promise.all(userOrderRecipesPromises);
          
          
  


          res.status(201).json({ message: "User created successfully",userOrderRecipesPromises });
      } else {
          res.status(400).json({ error: "Categories are required" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
 // Assuming you want to fetch order details based on user ID
 // Your existing code...

app.post('/getUserFromEmail', async (req, res) => {
    try {
      const userId = req.body.email;
  
      if (!userId) {
        return res.status(400).json({ error: 'ID is required' });
      }
  
      const query = 'SELECT * FROM edenmade.users WHERE email = :userId;';
      const userOrderRecipes = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { userId },
      });
  
      if (userOrderRecipes.length > 0) {
        res.json(userOrderRecipes);
      } else {
        res.status(404).json({ error: 'User Order Recipes not found for the given ID' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// API endpoint to get all data from orderdetails using raw query from userid
  app.post('/orderdetails', async (req, res) => {
    try {
      const userId = req.body.userId;
  
      if (!userId) {
        return res.status(400).json({ error: 'ID is required' });
      }
  
      const query = 'SELECT * FROM edenmade.orderdetails WHERE userId = :userId;';
      const userOrderRecipes = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { userId },
      });
  
      if (userOrderRecipes.length > 0) {
        res.json(userOrderRecipes);
      } else {
        res.status(404).json({ error: 'User Order Recipes not found for the given ID' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// API endpoint to get all data from userorderrecipes using raw query from userid
  app.post('/userorderrecipes', async (req, res) => {
    try {
      // Assuming orderdetailid is sent in the request body
      const orderdetailid = req.body.orderdetailid;
  
      // Make sure orderdetailid is provided
      if (!orderdetailid) {
        return res.status(400).json({ error: 'Orderdetailid is required' });
      }
  
      const query = `SELECT * FROM edenmade.userorderrecipes WHERE orderdetailid = ${orderdetailid};`;
      const userOrderRecipes = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
      });
  
      // Assuming you only expect one result, you can send the first element of the array
      if (userOrderRecipes.length > 0) {
        res.json(userOrderRecipes[0]);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // app.get('/userorderrecipes', async (req, res) => {
  //   try {
  //     // Execute the SELECT query
  //     const userOrderRecipes = await UserOrderRecipes.findAll();
  
  //     // Send the result as JSON
  //     res.json(userOrderRecipes);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });
  
  
  // Your existing code...
  // app.post('/userOrderRecipesDetail', async (req, res) => {
  //   try {
  //     const orderDetailId = req.body.orderDetailId;  // Corrected variable name
  
  //     if (!orderDetailId) {
  //       return res.status(400).json({ error: 'orderDetailId is required' });
  //     }
  
  //     const query = `
  //       SELECT 
  //         uor.*,
  //         r.title as recipeName,
  //         c.name as categoryName
  //       FROM 
  //         edenmade.userorderrecipes uor
  //       JOIN 
  //         Recipes r ON uor.recipeId = r.id
  //       JOIN 
  //         Categories c ON uor.categoryId = c.id
  //       WHERE 
  //         uor.orderDetailId = :orderDetailId;
          
  //     `;
  
  //     const userOrderRecipes = await sequelize.query(query, {
  //       type: Sequelize.QueryTypes.SELECT,
  //       replacements: { orderDetailId },
  //     });
  
  //     if (userOrderRecipes.length > 0) {
  //       res.json(userOrderRecipes);
  //     } else {
  //       res.status(404).json({ error: 'User Order Recipes not found for the given orderDetailId' });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });
  app.post('/userOrderRecipesDetail', async (req, res) => {
    try {
        const orderDetailId = req.body.orderDetailId;

        if (!orderDetailId) {
            return res.status(400).json({ error: 'orderDetailId is required' });
        }

        const query = `
        SELECT 
            DISTINCT uor.orderDetailId,
            uor.*,
            r.id as recipeId,
            r.title as recipeName,
            c.name as categoryName
        FROM 
            edenmade.userorderrecipes uor
        JOIN 
            Recipes r ON uor.recipeId = r.id
        JOIN 
            Categories c ON uor.categoryId = c.id
        WHERE 
            uor.orderDetailId = :orderDetailId;
    `;

        const userOrderRecipes = await sequelize.query(query, {
            type: Sequelize.QueryTypes.SELECT,
            replacements: { orderDetailId },
        });

        if (userOrderRecipes.length > 0) {
            // Extract recipeIds from the result
            const recipeIds = userOrderRecipes.map(recipe => recipe.recipeId);

            // Fetch recipe names based on recipeIds
            const recipes = await Recipes.findAll({
                attributes: ['id', 'title'],
                where: {
                    id: recipeIds,
                },
            });

            // Create a map for quicker lookup
            const recipeMap = new Map(recipes.map(recipe => [recipe.id, recipe.title]));

            // Map the recipe names to the userOrderRecipes result
            const resultWithRecipeNames = userOrderRecipes.map(userOrderRecipe => ({
                ...userOrderRecipe,
                recipeName: recipeMap.get(userOrderRecipe.recipeId) || null,
            }));

            res.json(resultWithRecipeNames);
        } else {
            res.status(404).json({ error: 'User Order Recipes not found for the given orderDetailId' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


  
  app.listen(8801, () => {
    console.log('Connected');
  });
  
  
  
  


app.listen(8800, () => {
    console.log("Connected");
});


