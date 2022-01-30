import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { GraphQLUpload } from 'graphql-upload'

import { Upload } from 'src/types/Upload'

import { FilesService } from './files.service'
@Resolver()
export class FilesResolver {
  constructor(private FilesService: FilesService) {}

  @Mutation(() => String)
  async pinFile(
    @Args('file', { type: () => GraphQLUpload }) file: Upload,
  ): Promise<void | string> {
    return this.FilesService.pinFile(file)
  }

  @Query(() => String)
  async testHello(): Promise<string> {
    return this.FilesService.testHello()
  }
}
