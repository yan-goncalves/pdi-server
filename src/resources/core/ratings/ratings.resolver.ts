import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateRatingInput } from '@ratings/dto/create-rating.input'
import { UpdateRatingInput } from '@ratings/dto/update-rating.input'
import { RatingModel } from '@ratings/entities/rating.entity'
import { RatingsService } from '@ratings/ratings.service'

@Resolver(() => RatingModel)
export class RatingsResolver {
  constructor(@Inject(RatingsService) private readonly service: RatingsService) {}

  @Query(() => RatingModel, { name: 'rating' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<RatingModel> {
    return await this.service.get(id)
  }

  @Query(() => [RatingModel], { name: 'ratings' })
  async list(): Promise<RatingModel[]> {
    return await this.service.list()
  }

  @Mutation(() => RatingModel)
  async createRating(@Args('input') input: CreateRatingInput): Promise<RatingModel> {
    return await this.service.create(input)
  }

  @Mutation(() => RatingModel)
  async updateRating(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateRatingInput
  ): Promise<RatingModel> {
    return await this.service.update(id, input)
  }
}
