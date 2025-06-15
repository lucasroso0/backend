import { IsNotEmpty, IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateIngressoDto {
  @IsInt({ message: 'O ID da sessão deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ID da sessão não pode ser vazio.' })
  sessaoId: number;

  @IsString({ message: 'O nome do cliente deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome do cliente não pode ser vazio.' })
  @MinLength(3, {
    message: 'O nome do cliente deve ter no mínimo 3 caracteres.',
  })
  nomeCliente: string;

  // CORREÇÃO APLICADA AQUI
  @IsInt({ message: 'O número do assento deve ser um número inteiro.' })
  @Min(1, { message: 'O número do assento deve ser no mínimo 1.' })
  @IsNotEmpty({ message: 'O assento não pode ser vazio.' })
  assento: number; // Alterado de string para number
}
