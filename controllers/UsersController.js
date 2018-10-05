import jwt from 'jsonwebtoken';

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
}

export default UsersController;
