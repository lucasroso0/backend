import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FilmeModule } from './filme/filme.module';

@Module({
  imports: [PrismaModule, FilmeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
