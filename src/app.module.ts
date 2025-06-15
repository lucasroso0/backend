// Em src/app.module.ts

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmeModule } from './filme/filme.module';
// CORREÇÃO AQUI: de IngressosModule para IngressoModule
import { IngressoModule } from './ingressos/ingressos.module';
import { SalaModule } from './sala/sala.module';

@Module({
  imports: [
    PrismaModule,
    FilmeModule,
    IngressoModule,
    SalaModule, // E CORREÇÃO AQUI TAMBÉM
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
