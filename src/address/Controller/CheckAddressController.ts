import { Controller, Get, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { IRequestDetail, Logger, RequestDetails } from 'src/shared/Util';
import { QueryBus } from '@nestjs/cqrs';
import { CheckAddressQuery } from '../Application';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckAddressBodyApiDoc, CheckAddressResponseApiDoc } from './Dto';

@ApiTags('Address')
@Controller('address')
export class CheckAddressController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({
    summary: 'Check address',
    description: 'Check address by google maps.',
    deprecated: false,
    operationId: 'checkAddress',
  })
  @ApiResponse({
    description: 'Address response',
    type: CheckAddressResponseApiDoc,
  })
  async checkAddress(
    @Req() req,
    @Res() res,
    @Query() checkAddressDto: CheckAddressBodyApiDoc,
    @RequestDetails() ctx?: IRequestDetail,
  ) {
    Logger.log(`Ctx: ${JSON.stringify(ctx)}`);

    const response = await this.queryBus.execute(
      CheckAddressQuery.create({ ...checkAddressDto }),
    );

    return res.status(HttpStatus.OK).json(response);
  }
}
