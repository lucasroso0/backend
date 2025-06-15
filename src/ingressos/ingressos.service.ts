import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';

@Injectable()
export class IngressoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createIngressoDto: CreateIngressoDto) {
    // Valida se a sessão para qual o ingresso está sendo comprado realmente existe
    const sessao = await this.prisma.sessao.findUnique({
      where: { id: createIngressoDto.sessaoId },
    });
    if (!sessao) {
      throw new NotFoundException(
        `Sessão com ID ${createIngressoDto.sessaoId} não encontrada.`,
      );
    }

    // Valida se o assento para esta sessão já está ocupado
    const assentoOcupado = await this.prisma.ingresso.findFirst({
      where: {
        sessaoId: createIngressoDto.sessaoId,
        assento: createIngressoDto.assento,
      },
    });

    if (assentoOcupado) {
      throw new ConflictException(
        `O assento ${createIngressoDto.assento} para esta sessão já está ocupado.`,
      );
    }

    // Se passou por todas as validações, cria o ingresso
    return this.prisma.ingresso.create({
      data: createIngressoDto,
    });
  }

  async findAll() {
    return this.prisma.ingresso.findMany({
      include: {
        // Inclui detalhes da sessão para dar mais contexto
        sessao: {
          include: {
            filme: true,
            sala: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const ingresso = await this.prisma.ingresso.findUnique({
      where: { id },
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
          },
        },
      },
    });
    if (!ingresso) {
      throw new NotFoundException(`Ingresso com ID ${id} não encontrado.`);
    }
    return ingresso;
  }

  async update(id: number, updateIngressoDto: UpdateIngressoDto) {
    await this.findOne(id); // Garante que o ingresso existe
    return this.prisma.ingresso.update({
      where: { id },
      data: updateIngressoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Garante que o ingresso existe
    return this.prisma.ingresso.delete({
      where: { id },
    });
  }
}
