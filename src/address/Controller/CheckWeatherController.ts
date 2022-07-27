import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import {
  ForceAuth,
  IRequestDetail,
  Logger,
  RequestDetails,
} from 'src/shared/Util';
import { QueryBus } from '@nestjs/cqrs';
import { CheckWeatherQuery } from '../Application';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckAddressBodyApiDoc, CheckWeatherResponseApiDoc } from './Dto';
import { HttpExceptionFilter } from '../../shared/Util/decorators/HttpExceptionFilter';

@ApiTags('Weather')
@Controller('weather')
export class CheckWeatherController {
  constructor(private readonly queryBus: QueryBus) {}

  @ForceAuth()
  @Get()
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({
    summary: 'Check Weather by address',
    description: 'CheckWeather by google maps address.',
    deprecated: false,
    operationId: 'checkWeather',
  })
  @ApiResponse({
    description: 'Weather response',
    type: CheckWeatherResponseApiDoc,
  })
  async create(
    @Res() res,
    @Query() checkAddressDto: CheckAddressBodyApiDoc,
    @RequestDetails() ctx?: IRequestDetail,
  ) {
    Logger.log(`Ctx: ${JSON.stringify(ctx)}`);
    const response = await this.queryBus.execute(
      CheckWeatherQuery.create({ ...checkAddressDto }),
    );

    return res.status(HttpStatus.OK).json(response);
  }
}
