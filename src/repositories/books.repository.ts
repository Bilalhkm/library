import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Books, BooksRelations} from '../models';

export class BooksRepository extends DefaultCrudRepository<
  Books,
  typeof Books.prototype.bookId,
  BooksRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Books, dataSource);
  }
}
