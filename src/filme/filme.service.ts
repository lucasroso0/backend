import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Injectable()
export class FilmeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFilmeDto: CreateFilmeDto) {
    // 2. VERIFICA SE O FILME JÁ EXISTE
    // Corrigido: Use 'findFirst' para buscar por campos que não são únicos, como 'titulo'
    const filmeExiste = await this.prisma.filme.findFirst({
      where: { titulo: createFilmeDto.titulo },
    });

    // 3. SE EXISTIR, LANÇA UM ERRO
    if (filmeExiste) {
      throw new ConflictException(
        `Já existe um filme cadastrado com o título "${createFilmeDto.titulo}"`,
      );
    }

    // 4. SE NÃO EXISTIR, CRIA O NOVO FILME
    return this.prisma.filme.create({
      data: createFilmeDto,
    });
  }

  async findAll() {
    return this.prisma.filme.findMany();
  }

  async findOne(id: number) {
    // 'findUnique' está correto aqui, pois busca pelo ID que é um campo único.
    const filme = await this.prisma.filme.findUnique({ where: { id } });
    if (!filme)
      throw new NotFoundException(`Filme com ID ${id} não encontrado`);
    return filme;
  }

  async update(id: number, updateFilmeDto: UpdateFilmeDto) {
    await this.findOne(id); // Garante que o filme existe
    return this.prisma.filme.update({
      where: { id },
      data: updateFilmeDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Garante que o filme existe
    return this.prisma.filme.delete({
      where: { id },
    });
  }
}
