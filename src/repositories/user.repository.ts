import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.userId,
  UserRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(User, dataSource);
  }
}
