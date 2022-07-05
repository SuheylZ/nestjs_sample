import { Test, TestingModule } from '@nestjs/testing';
import { UserRequest } from './user.models';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const createReturnValue = 1

  const userService = {
    create: jest.fn(async dto=> await Promise.resolve(createReturnValue))
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: userService
      }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Can call create', async () => {
    const request = { name: 'John', age: 34 } as UserRequest
    
    const res =await controller.create(request)
    
    // check that return value is there
    expect(res).toBe(createReturnValue)

    // check that service method has been called
    expect(userService.create).toHaveBeenCalled()

    // Check that service method was called with right arguments
    expect(userService.create).toHaveBeenCalledWith(request)
  })
});
