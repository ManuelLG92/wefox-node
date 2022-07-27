import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Response,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { AuthService } from './services';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards';
import { IRequestDetail, Logger, RequestDetails } from '../shared/Util';
import { Public } from '../shared/Util/decorators/public';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginApiDoc, TokenResponseApiDoc } from './dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @ApiOperation({
    summary: 'Login with google',
    description: 'Login with google',
    deprecated: false,
    operationId: 'googleLogin',
  })
  @ApiResponse({
    description: 'Token Response',
    type: TokenResponseApiDoc,
  })
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @ApiOperation({
    summary: 'Call back from google after auth to server',
    description: 'Call back from google after auth to server',
    deprecated: false,
    operationId: 'googleCallBack',
  })
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @RequestDetails() ctx: IRequestDetail) {
    Logger.log(`ctx: ${JSON.stringify(ctx)}`);
    return this.authService.googleLogin(req);
  }

  @Public()
  @Post('login')
  @Get('google')
  @ApiOperation({
    summary: 'Login with email and password',
    description: 'Login email and password',
    deprecated: false,
    operationId: 'appLogin',
  })
  @ApiResponse({
    description: 'Token Response',
    type: TokenResponseApiDoc,
  })
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req,
    @RequestDetails() ctx: IRequestDetail,
    @Response() res,
    @Body() body: LoginApiDoc,
  ) {
    Logger.log(
      `User login: ${JSON.stringify(body)} ctx: ${JSON.stringify(ctx)}`,
    );
    const JWT = await this.authService.jwtCreateAndRefresh(req.user, ctx);
    return res.status(HttpStatus.OK).set({ 'x-access-token': JWT }).json({});
  }
}
