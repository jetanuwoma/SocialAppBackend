'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'gender',
      {
        type: Sequelize.STRING,
        defaultValue: 'Male',
        allowNull: false
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'gender');
  }
};
