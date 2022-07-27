import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { FindUserByEmailQuery } from '../../Application';
import { Public } from '../../../shared/Util/decorators/public';
import { QueryBus } from '@nestjs/cqrs';
import { IRequestDetail, Logger, RequestDetails } from '../../../shared/Util';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindUserDto } from '../../dto/find-user.dto';

@ApiTags('User')
@Controller('user')
export class FindUserByEmailController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @Get(':email')
  @ApiOperation({
    summary: 'Find User By Email',
    description: 'Find User By Email',
    deprecated: false,
    operationId: 'findUserByEmail',
  })
  @ApiResponse({
    description: 'User by email response',
    type: FindUserDto,
  })
  async index(
    @Req() req,
    @Res() res,
    @Param('email') email: string,
    @RequestDetails() ctx?: IRequestDetail,
  ) {
    Logger.log(
      `Request Email: ${JSON.stringify(email)} | ctx: ${JSON.stringify(ctx)}`,
    );

    const response = await this.queryBus.execute(
      FindUserByEmailQuery.create(email),
    );

    return res.status(HttpStatus.OK).json(response);
  }
}
