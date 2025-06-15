import { Min, IsInt, IsNotEmpty, IsString, Max } from 'class-validator';

export class CreateFilmeDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  duracao: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(2100)
  ano: number;

  @IsString()
  @IsNotEmpty()
  diretor: string;
}
