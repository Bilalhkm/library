import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Books extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  bookId?: string;

  @property({
    type: 'string',
    required: true,
  })
  bookName: string;

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @property({
    type: 'string',
    required: true,
  })
  file: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Books>) {
    super(data);
  }
}

export interface BooksRelations {
  // describe navigational properties here
}

export type BooksWithRelations = Books & BooksRelations;
