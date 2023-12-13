'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const categoriesData = [
            { name: 'Chinese' , createdAt: new Date(),
            updatedAt: new Date(),},
            { name: 'Seasonal' , createdAt: new Date(),
            updatedAt: new Date(),},
            { name: 'Thai' , createdAt: new Date(),
            updatedAt: new Date(),},
            { name: 'BBQ' , createdAt: new Date(),
            updatedAt: new Date(),},
            { name: 'Mexican' , createdAt: new Date(),
            updatedAt: new Date(),},
            { name: 'Italian' , createdAt: new Date(),
            updatedAt: new Date(),},
            { name: 'Arabian' , createdAt: new Date(),
            updatedAt: new Date(),},
            { name: 'Continental', createdAt: new Date(),
            updatedAt: new Date(), },  
            // Add more categories if needed
        ];

        await queryInterface.bulkInsert('Categories', categoriesData, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Categories', null, {});
    },
};
