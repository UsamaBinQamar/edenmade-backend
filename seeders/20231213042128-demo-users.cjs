'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '1234567890',
                address: '123 Main St',
                city: 'Sample City',
                postalCode: '12345',
                numberOfPeople: 3,
                numberOfDishesPerWeek: 7,
                // categoryId: 1, // Adjust based on your existing category ID
                // recipeId: 1, // Adjust based on your existing recipe ID
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'Jane',
                lastName: 'Doe',
                phoneNumber: '9876543210',
                address: '456 Oak St',
                city: 'Example City',
                postalCode: '54321',
                numberOfPeople: 2,
                numberOfDishesPerWeek: 5,
                // categoryId: 2, // Adjust based on your existing category ID
                // recipeId: 2, // Adjust based on your existing recipe ID
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Add more demo data as needed
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
