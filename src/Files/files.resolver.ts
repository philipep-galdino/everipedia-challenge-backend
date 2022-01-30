import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { GraphQLUpload } from 'graphql-upload'

import { File } from 'src/types/File'

import { FilesService } from './files.service'
@Resolver()
export class FilesResolver {
  constructor(private FilesService: FilesService) {}

  @Mutation(() => String)
  async uploadAndPinFile(
    @Args('file', { type: () => GraphQLUpload }) file: File,
  ): Promise<void | string> {
    return this.FilesService.uploadAndPinFile(file)
  }

  @Query(() => String)
  async testHello(): Promise<string> {
    return this.FilesService.testHello()
  }
}
