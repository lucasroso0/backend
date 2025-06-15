import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
//import { Filme } from '@prisma/client'; // Importando o tipo Filme do Prisma

@Injectable()
export class FilmeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFilmeDto: CreateFilmeDto) {
    return this.prisma.filme.create({
      data: {
        titulo: createFilmeDto.titulo,
        duracao: createFilmeDto.duracao,
        ano: createFilmeDto.ano,
        diretor: createFilmeDto.diretor,
      },
    });
  }

  async findAll() {
    return this.prisma.filme.findMany();
  }

  async findOne(id: number) {
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
