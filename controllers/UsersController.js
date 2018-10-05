import jwt from 'jsonwebtoken';
import {sequelize, User } from '../models';

const userRecordDetail = user => ({
  id: user.id,
  username: user.username,
  fullName: user.fullName,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  roleId: user.roleId 
});


class UsersController {
  
  static login(req, res) {
    res.status(200).send({ message: 'Successfully login' });
  }

  static signUp(req, res) {
    const { username, fullName, email, password, roleId, contact_number, dob } = req.body;
    const userToCreate = { username,
      fullName,
      email,
      password,
      contact_number,
      roleId,
      dob
    };
    User.create(userToCreate).then((newUser) => {
      const token = jwt.sign({
        userId: newUser.id,
        roleId: newUser.roleId,
        fullName: newUser.fullName,
        email: newUser.email,
      }, req.secret, {
        expiresIn: '7 days'
      });
      const user = userRecordDetail(newUser);
      res.status(201)
      .send({
        user,
        token,
        expiresIn: '3 days'
      });
    }).catch(sequelize.ValidationError, (err) => {
      res.status(400)
      .send(err);
    });
  }
}

export default UsersController;
