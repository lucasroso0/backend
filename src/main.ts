import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Garante que o frontend (em outra porta) possa acessar o backend
  app.enableCors();

  // Define a porta do backend explicitamente para 3001
  await app.listen(3001);

  console.log(`Backend rodando na porta 3001`); // Linha útil para depuração
}
bootstrap();
