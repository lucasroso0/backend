import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateSalaDto {
  @IsString({ message: 'O nome da sala deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome da sala não pode ser vazio.' })
  nome: string;

  @IsInt({ message: 'A capacidade deve ser um número inteiro.' })
  @Min(1, { message: 'A capacidade mínima da sala é de 1 assento.' })
  @IsNotEmpty({ message: 'A capacidade não pode ser vazia.' })
  capacidade: number;
}
