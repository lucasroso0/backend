import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';

@Injectable()
export class SalaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSalaDto: CreateSalaDto) {
    // CORREÇÃO AQUI: Troquei findUnique por findFirst
    const salaExiste = await this.prisma.sala.findFirst({
      where: { nome: createSalaDto.nome },
    });

    if (salaExiste) {
      throw new ConflictException(
        `Já existe uma sala cadastrada com o nome "${createSalaDto.nome}".`,
      );
    }

    return this.prisma.sala.create({
      data: createSalaDto,
    });
  }

  async findAll() {
    return this.prisma.sala.findMany();
  }

  async findOne(id: number) {
    // findUnique aqui está correto, pois busca pelo ID
    const sala = await this.prisma.sala.findUnique({
      where: { id },
    });
    if (!sala) {
      throw new NotFoundException(`Sala com ID ${id} não encontrada.`);
    }
    return sala;
  }

  async update(id: number, updateSalaDto: UpdateSalaDto) {
    await this.findOne(id); // Garante que a sala existe
    return this.prisma.sala.update({
      where: { id },
      data: updateSalaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Garante que a sala existe
    return this.prisma.sala.delete({
      where: { id },
    });
  }
}
