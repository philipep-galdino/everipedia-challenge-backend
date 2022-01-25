import { Resolver, Query } from '@nestjs/graphql'

@Resolver()
export class FilesResolver {
  // constructor(
  //   private filesService: FilesService,
  //   private postsService: PostsService,
  // ) {}

  @Query(() => String)
  async hello() {
    return 'hello'
  }
}
