'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
      const recipesData = [
        { title: 'Spaghetti Bolognese', ingredients: 'Ground beef, tomatoes, pasta', instructions: 'Cook ground beef, add tomatoes, serve over pasta.', categoryId: 6, createdAt: new Date(), updatedAt: new Date() },
        { title: 'Vegetarian Pizza', ingredients: 'Pizza dough, tomato sauce, bell peppers, mushrooms', instructions: 'Spread tomato sauce on dough, add vegetables, bake in the oven.', categoryId: 6, createdAt: new Date(), updatedAt: new Date() },
        { title: 'Salmon Teriyaki', ingredients: 'Salmon fillet, soy sauce, honey, ginger', instructions: 'Marinate salmon in soy sauce, honey, and ginger. Grill until cooked.', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
        { title: 'Mushroom Risotto', ingredients: 'Arborio rice, mushrooms, chicken broth', instructions: 'Sauté mushrooms, add rice and broth, stir until creamy.', categoryId: 7, createdAt: new Date(), updatedAt: new Date() },
        { title: 'Taco Salad', ingredients: 'Ground turkey, lettuce, tomatoes, cheese', instructions: 'Cook ground turkey, assemble salad with lettuce, tomatoes, and cheese.', categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
        { title: 'Veggie Stir Fry', ingredients: 'Broccoli, carrots, tofu, soy sauce', instructions: 'Stir fry vegetables and tofu, add soy sauce.', categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
        { title: 'Lemon Garlic Shrimp', ingredients: 'Shrimp, garlic, lemon, butter', instructions: 'Sauté shrimp in garlic and butter, squeeze lemon over.', categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
        { title: 'Caprese Salad', ingredients: 'Tomatoes, mozzarella, basil, balsamic glaze', instructions: 'Slice tomatoes and mozzarella, arrange with basil, drizzle with balsamic glaze.', categoryId: 6, createdAt: new Date(), updatedAt: new Date() },
        { title: 'Chicken Caesar Wrap', ingredients: 'Grilled chicken, romaine lettuce, Caesar dressing', instructions: 'Grill chicken, wrap in lettuce, and drizzle with Caesar dressing.', categoryId: 8, createdAt: new Date(), updatedAt: new Date() },
        { title: 'Vegetable Curry', ingredients: 'Mixed vegetables, curry paste, coconut milk', instructions: 'Cook vegetables in curry paste and coconut milk until tender.', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
        { title: 'BBQ Pulled Pork Sandwich', ingredients: 'Pork shoulder, BBQ sauce, buns', instructions: 'Slow cook pork shoulder, shred, and mix with BBQ sauce. Serve on buns.', categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
 
    ];
    

        await queryInterface.bulkInsert('Recipes', recipesData, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Recipes', null, {});
    },
};
