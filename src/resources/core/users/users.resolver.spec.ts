import { ROLES } from '@constants/roles'
import { Int } from '@nestjs/graphql'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateUserInput } from '@users/dto/create-user.input'
import { UserModel } from '@users/entities/user.entity'
import userMock from '@users/mock'
import {
  UserModelReturnType,
  UserModelReturnTypeArgs,
  UserModelReturnTypeArray,
  UsersResolver
} from '@users/users.resolver'
import { UsersService } from '@users/users.service'

describe('UsersResolver', () => {
  let resolver: UsersResolver

  const usersServiceMock = {
    create: jest.fn((input: CreateUserInput): UserModel => userMock(input)),
    list: jest.fn((): UserModel[] => [userMock()]),
    get: jest.fn((): UserModel => userMock()),
    setConfirmed: jest.fn((): UserModel => ({ ...userMock(), confirmed: true })),
    block: jest.fn((): UserModel => ({ ...userMock(), blocked: true })),
    delete: jest.fn((): UserModel => ({ ...userMock(), deletedAt: new Date() }))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: usersServiceMock
        }
      ]
    }).compile()

    resolver = module.get<UsersResolver>(UsersResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should cover handler decorators', () => {
    expect(UserModelReturnType()).toBe(UserModel)
    expect(UserModelReturnTypeArray()).toEqual([UserModel])
    expect(UserModelReturnTypeArgs()).toBe(Int)
  })

  it('should create a new user', async () => {
    const user = await resolver.createUser({
      username: 'yangoncalves',
      email: 'yangoncalves@slworld.com'
    })

    expect(user.id).toEqual(1)
    expect(user.username).toEqual('yangoncalves')
    expect(usersServiceMock.create).toBeCalledTimes(1)
  })

  it('should get a single valid user', async () => {
    const user = await resolver.get(1)

    expect(user.id).toEqual(1)
    expect(user.blocked).toBe(false)
    expect(user?.deletedAt).toBeUndefined()
  })

  it('should list all users', async () => {
    const users = await resolver.list()

    expect(users).toStrictEqual(expect.arrayContaining(users))
    expect(users).toHaveLength(1)
  })

  it('should set confirmed a user', async () => {
    const user = await resolver.createUser({
      username: 'lucasrosa',
      email: 'lucasrosa@slworld.com',
      role: ROLES.MANAGER
    })

    expect(user.confirmed).toBe(false)

    const confirmedUser = await resolver.updateUser(user.id, { confirmed: true })
    expect(confirmedUser.confirmed).toBe(true)
  })

  it('should black a user', async () => {
    const user = await resolver.get(1)
    expect(user.blocked).toBe(false)

    const blockedUser = await resolver.updateUser(user.id, { blocked: true })
    expect(blockedUser.blocked).toBe(true)
  })

  it('should soft delete a user', async () => {
    const user = await resolver.removeUser(1)
    expect(user?.deletedAt).not.toBe(undefined)
  })
})
