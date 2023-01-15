import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Books} from '../models';
import {BooksRepository} from '../repositories';

export class BooksController {
  constructor(
    @repository(BooksRepository)
    public booksRepository: BooksRepository,
  ) {}

  @post('/books')
  @response(200, {
    description: 'Books model instance',
    content: {'application/json': {schema: getModelSchemaRef(Books)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Books, {
            title: 'NewBook',
            exclude: ['book_id'],
          }),
        },
      },
    })
    books: Omit<Books, 'book_id'>,
  ): Promise<Books> {
    return this.booksRepository.create(books);
  }

  @get('/books')
  @response(200, {
    description: 'Array of Books model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Books, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Books) filter?: Filter<Books>): Promise<Books[]> {
    return this.booksRepository.find(filter);
  }

  @get('/books/{id}')
  @response(200, {
    description: 'Books model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Books, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Books, {exclude: 'where'})
    filter?: FilterExcludingWhere<Books>,
  ): Promise<Books> {
    return this.booksRepository.findById(id, filter);
  }

  @patch('/books/{id}')
  @response(204, {
    description: 'Books PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Books, {partial: true}),
        },
      },
    })
    books: Books,
  ): Promise<void> {
    await this.booksRepository.updateById(id, books);
  }

  @put('/books/{id}')
  @response(204, {
    description: 'Books PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() books: Books,
  ): Promise<void> {
    await this.booksRepository.replaceById(id, books);
  }

  @del('/books/{id}')
  @response(204, {
    description: 'Books DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.booksRepository.deleteById(id);
  }
}
