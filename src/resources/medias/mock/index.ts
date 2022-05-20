import faker from '@faker-js/faker'
import { MediaModel } from '@medias/entities/media.entity'

const mediaMock: MediaModel = {
  id: 1,
  filename: 'filename.jpg',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default mediaMock
