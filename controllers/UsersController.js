import jwt from 'jsonwebtoken';
import {sequelize, User } from '../models';

const userRecordDetail = user => ({
  id: user.id,
  username: user.username,
  fullName: user.fullName,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  roleId: user.roleId,
  gender: user.gender
});


class UsersController {
  
  static login(req, res) {
    const { username, password } = req.body;
    User.findOne({
      where: {
        $or: [
          { email: username },
          { username }
        ]
      }
    }).then((user) => {
      if (user && user.validPassword(password)) {
        const token = jwt.sign({
              id: user.id,
              roleId: user.roleId,
              fullName: user.fullName,
              username: user.username,
              email: user.email,
              contact_number: user.contact_number,
              gender: user.gender
            }, req.secret, { expiresIn: '7 days' });
        res.status(200).send({ user: userRecordDetail(user), token });
      } else {
        res.status(400).send({ message: 'Invalid Credentials' });
      }
    }).catch((error) => {
      res.status(400).send(error);
    })
  }

  static signUp(req, res) {
    const { username, fullName, email, password, roleId, contact_number, dob, gender } = req.body;
    const userToCreate = { username,
      fullName,
      email,
      password,
      contact_number,
      roleId,
      dob,
      gender
    };
    User.create(userToCreate).then((newUser) => {
      const token = jwt.sign({
        id: newUser.id,
        roleId: newUser.roleId,
        fullName: newUser.fullName,
        email: newUser.email,
        contact_number: newUser.contact_number,
        gender: newUser.gender
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
