import bcrypt from 'bcrypt-nodejs';
'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: { is: /\w+$/i }
    },
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: { is: /\w+$/i }
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    contact_number: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dob: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },

      beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });


  User.associate = (models) => {
    models.User.belongsTo(models.Role, {
      onDelete: 'CASCADE',
      foreignKey: 'roleId'
    });
  }

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }
  
  User.prototype.hashPassword = function() {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  return User;
};
