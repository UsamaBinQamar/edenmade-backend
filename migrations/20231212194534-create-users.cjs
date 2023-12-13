module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            postalCode: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            numberOfPeople: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            numberOfDishesPerWeek: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Categories',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            recipeId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Recipes',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    },
};
