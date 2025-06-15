import { Module } from '@nestjs/common';
import { IngressoService } from './ingressos.service';
import { IngressoController } from './ingressos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  exports: [IngressoService],
  imports: [PrismaModule],
  controllers: [IngressoController],
  providers: [IngressoService],
})
export class IngressoModule {}
