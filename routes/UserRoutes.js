import UsersController from '../controllers/UsersController';

export default (router) => {
  
  router.route('/users/login')
    .post(UsersController.login);
}