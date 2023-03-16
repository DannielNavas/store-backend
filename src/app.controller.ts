import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola Mundo!';
  }
  @Get('new')
  newEndpoint() {
    return 'Yo soy nuevo!';
  }
  //TODO: Nestjs resuelve la ruta con '/' o sin '/' al final
  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }
}
