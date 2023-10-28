import { Repository } from 'typeorm';
import { Category } from '../../src/modules/categories/infra/typeorm/entities/Category';
import { ICategoryRepository } from '../../src/modules/categories/repositories/ICategoryRepository';
import { IUserRepository } from '../../src/modules/users/repositories/IUserRepository';
import { User } from '../../src/modules/users/infra/typeorm/entities/User';
import { CategoryRepository } from '../../src/modules/categories/infra/typeorm/repositories/CategoryRepository';
import { UserRepository } from '../../src/modules/users/infra/typeorm/repositories/UserRepository';
import dataSourceTest from '../../src/config/__test__';

describe('Category repository test', () => {
  let ormCategoryRepository: Repository<Category>;

  let categoryRepository: ICategoryRepository;
  let userRepository: IUserRepository;

  let user: User;

  beforeAll(async () => {
    ormCategoryRepository = dataSourceTest.getRepository(Category);

    categoryRepository = new CategoryRepository();
    userRepository = new UserRepository();

    const name = 'test';
    const email = 'test@test';
    const password = '1234';

    user = (await userRepository.create({ name, email, password })) as User;
  });

  afterEach(async () => {
    await ormCategoryRepository.delete({});
  });

  it('Should be able to create a category', async () => {
    const name = 'test';

    const category = await categoryRepository.create(name, user);

    expect(category).toBeInstanceOf(Category);
    expect(category).toHaveProperty('id');
    expect(category.name).toEqual(name);
  });

  it('Should be able to delete category', async () => {
    const name = 'test 1';

    const category = ormCategoryRepository.create({ name, user });

    await ormCategoryRepository.save(category);

    await categoryRepository.delete(category);

    const foundCategory = await categoryRepository.findById(category.id);

    expect(foundCategory).toBeNull();
  });

  it('Should be able to find by ID', async () => {
    const name = 'test 2';

    const category = ormCategoryRepository.create({ name, user });

    await ormCategoryRepository.save(category);

    const foundCategory = (await categoryRepository.findById(
      category.id,
    )) as Category;

    expect(foundCategory).toBeInstanceOf(Category);
    expect(foundCategory.id).toEqual(category.id);
  });

  it('Should be able to find all with filter name', async () => {
    const name = 'test 3';

    const category = ormCategoryRepository.create({ name, user });

    await ormCategoryRepository.save(category);

    const foundCategories = await categoryRepository.findAll(
      user.id,
      category.name,
    );

    expect(foundCategories).toHaveLength(1);
    expect(foundCategories[0]).toBeInstanceOf(Category);
    expect(foundCategories[0].id).toEqual(category.id);
  });

  it('Should be able to find all', async () => {
    const name = 'test 4';

    const category = ormCategoryRepository.create({ name, user });

    await ormCategoryRepository.save(category);

    const foundCategories = await categoryRepository.findAll(user.id);

    expect(foundCategories).toHaveLength(1);
    expect(foundCategories[0]).toBeInstanceOf(Category);
    expect(foundCategories[0].id).toEqual(category.id);
  });
});