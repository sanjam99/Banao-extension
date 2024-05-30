'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LinkedInProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.TEXT
      },
      bio: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.STRING
      },
      followerCount: {
        type: Sequelize.STRING
      },
      connectionCount: {
        type: Sequelize.STRING
      },
      bioLine: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LinkedInProfiles');
  }
};