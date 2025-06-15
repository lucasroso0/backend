import { Min, IsInt, IsNotEmpty, IsString, Max } from 'class-validator';

export class CreateFilmeDto {
  @IsString({ message: 'O título deve ser um texto.' })
  @IsNotEmpty({ message: 'O título não pode ser vazio.' })
  titulo: string;

  @IsInt({ message: 'A duração deve ser um número inteiro de minutos.' })
  @Min(1, { message: 'A duração mínima é de 1 minuto.' })
  @Max(400, { message: 'A duração máxima permitida é de 400 minutos.' }) // Ex: Limite de ~6.5 horas
  @IsNotEmpty({ message: 'A duração não pode ser vazia.' })
  duracao: number;

  @IsInt({ message: 'O ano deve ser um número inteiro.' })
  @Min(1895, { message: 'O ano de lançamento não pode ser anterior a 1895.' }) // Ano do primeiro filme
  @IsNotEmpty({ message: 'O ano não pode ser vazio.' })
  ano: number;

  @IsString({ message: 'O nome do diretor deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome do diretor não pode ser vazio.' })
  diretor: string;
}
