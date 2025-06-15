import {
  IsNotEmpty,
  IsInt,
  IsDateString,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateSessaoDto {
  @IsInt({ message: 'O ID do filme deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ID do filme não pode ser vazio.' })
  filmeId: number;

  @IsInt({ message: 'O ID da sala deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ID da sala não pode ser vazio.' })
  salaId: number;

  @IsDateString(
    {},
    {
      message:
        'O horário deve estar no formato de data e hora válido (ISO 8601).',
    },
  )
  @IsNotEmpty({ message: 'O horário da sessão não pode ser vazio.' })
  horario: string; // Ex: "2025-06-15T20:30:00.000Z"

  @IsNumber({}, { message: 'O valor do ingresso deve ser um número.' })
  @IsPositive({ message: 'O valor do ingresso deve ser um número positivo.' })
  @IsNotEmpty({ message: 'O valor do ingresso não pode ser vazio.' })
  valorIngresso: number;
}
