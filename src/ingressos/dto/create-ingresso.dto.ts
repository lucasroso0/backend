import { IsNotEmpty, IsInt, IsString, IsIn, MinLength } from 'class-validator';

export class CreateIngressoDto {
  @IsInt({ message: 'O ID da sessão deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ID da sessão não pode ser vazio.' })
  sessaoId: number;

  // O CAMPO 'nomeCliente' PRECISA ESTAR AQUI:
  @IsString({ message: 'O nome do cliente deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome do cliente não pode ser vazio.' })
  @MinLength(3, {
    message: 'O nome do cliente deve ter no mínimo 3 caracteres.',
  })
  nomeCliente: string;

  @IsString({ message: 'O assento deve ser um texto (ex: "A1").' })
  @IsNotEmpty({ message: 'O assento não pode ser vazio.' })
  assento: string;

  @IsIn(['INTEIRA', 'MEIA'], {
    message: 'O tipo do ingresso deve ser "INTEIRA" ou "MEIA".',
  })
  @IsNotEmpty({ message: 'O tipo do ingresso não pode ser vazio.' })
  tipo: string;
}
