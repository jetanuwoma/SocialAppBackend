import Logger from 'logger';
import bcrypt from 'bcrypt-nodejs';
import faker from 'faker';
import { sequelize, Role } from '../models';
/**
 * Seeder - Class to populate database with values for testing purpose
 */
class Seeder {

  /**
   * Seeding database with test values
   * @return {void}
   */
  static seed() {
    const logger = Logger.createLogger();
    sequelize.sync({ force: true })
    .then(() => {
      Seeder.seedRoles();
    })
    .catch((err) => {
      logger.error(err);
    });
  }

  /**
   * seedRoles - Seed the roles table with some data for testing purpose
   * @return {Object} An instance of sequelize
   */
  static seedRoles() {
    const roles = [
      {
        title: 'SuperAdmin',
      },
      {
        title: 'User',
      },
      {
        title: 'Dev',
      }
    ];
    return Role.bulkCreate(roles);
  }

}

export default Seeder.seed();