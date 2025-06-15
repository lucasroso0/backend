import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';

@Injectable()
export class SessaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSessaoDto: CreateSessaoDto) {
    // Desestruturamos o DTO para separar os campos
    const { filmeId, salaId, horario } = createSessaoDto;

    const filme = await this.prisma.filme.findUnique({
      where: { id: filmeId },
    });
    if (!filme) {
      throw new NotFoundException(`Filme com ID ${filmeId} não encontrado.`);
    }

    const sala = await this.prisma.sala.findUnique({ where: { id: salaId } });
    if (!sala) {
      throw new NotFoundException(`Sala com ID ${salaId} não encontrada.`);
    }

    // CORREÇÃO AQUI: Passamos apenas os campos que o modelo Sessao conhece
    return this.prisma.sessao.create({
      data: {
        filmeId: filmeId,
        salaId: salaId,
        horario: horario,
      },
    });
  }
  // O resto do seu serviço continua igual...
  async findAll() {
    return this.prisma.sessao.findMany({
      include: {
        filme: true,
        sala: true,
      },
    });
  }

  async findOne(id: number) {
    const sessao = await this.prisma.sessao.findUnique({
      where: { id },
      include: { filme: true, sala: true },
    });
    if (!sessao) {
      throw new NotFoundException(`Sessão com ID ${id} não encontrada.`);
    }
    return sessao;
  }

  async update(id: number, updateSessaoDto: UpdateSessaoDto) {
    await this.findOne(id);
    return this.prisma.sessao.update({
      where: { id },
      data: updateSessaoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.sessao.delete({
      where: { id },
    });
  }
  // Dentro da classe SessaoService, depois do método remove()

  async getAssentosStatus(sessaoId: number) {
    // 1. Busca a sessão e inclui a sala (para saber a capacidade) e os ingressos (para saber os assentos ocupados)
    const sessao = await this.prisma.sessao.findUnique({
      where: { id: sessaoId },
      include: {
        sala: {
          select: { capacidade: true },
        },
        ingressos: {
          select: { assento: true },
        },
      },
    });

    if (!sessao) {
      throw new NotFoundException(`Sessão com ID ${sessaoId} não encontrada.`);
    }

    // 2. Extrai os dados que o frontend precisa
    const capacidadeTotal = sessao.sala.capacidade;
    const assentosOcupados = sessao.ingressos.map(
      (ingresso) => ingresso.assento,
    );

    // 3. Retorna um objeto limpo com as informações
    return {
      capacidadeTotal,
      assentosOcupados,
    };
  }
}
