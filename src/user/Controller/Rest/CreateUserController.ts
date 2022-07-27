import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { CreateUserCommand } from '../../Application';
import { CreateUserDto } from '../../dto/create-user.dto';
import { IRequestDetail, Logger, RequestDetails } from '../../../shared/Util';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../shared/Util/decorators/public';

@ApiTags('User')
@Controller('user')
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Create user with email and password',
    description: 'Create user with email and password',
    deprecated: false,
    operationId: 'createUser',
  })
  async index(
    @Req() req,
    @Res() res,
    @Body() createUserDto: CreateUserDto,
    @RequestDetails() ctx?: IRequestDetail,
  ) {
    Logger.log(`Ctx: ${JSON.stringify(ctx)}`);

    const response = await this.commandBus.execute(
      new CreateUserCommand({ ...createUserDto }),
    );

    return res.status(HttpStatus.CREATED).json(response);
  }
}
