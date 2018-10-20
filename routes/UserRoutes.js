import UsersController from '../controllers/UsersController';
import Access from '../middleware/Access';

export default (router) => {
  
  router.use(Access.init);
  router.route('/users')
    .post(UsersController.signUp);

  router.route('/users/login')
    .post(UsersController.login);
  
  router.route('/users/:id')
  .put(Access.verifyToken, UsersController.updateUser) 
}