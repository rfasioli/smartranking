import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { PartidasService } from 'src/partidas/partidas.service';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto copy';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio, DesafioStatus } from './interfaces/desafio.interface';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService,
    private readonly partidasService: PartidasService,
  ) {}

  async criarDesafio(desafioDto: CriarDesafioDto): Promise<Desafio> {
    const { dataHoraDesafio } = desafioDto;

    const jogadores = await Promise.all(
      desafioDto.jogadores.map((j) =>
        this.jogadoresService.consultaJogadorPeloId(j._id),
      ),
    );

    const solicitante = jogadores.find((j) =>
      j._id.equals(desafioDto.solicitante._id),
    );

    if (!solicitante) {
      throw new BadRequestException(
        'O solicitante deve ser um dos jogadores do desafio',
      );
    }

    const {
      categoria,
    } = await this.categoriasService.consultarCategoriaPorJogador(solicitante);

    const desafioCriado = new this.desafioModel({
      dataHoraDesafio,
      solicitante,
      jogadores,
      categoria,
      status: DesafioStatus.PENDENTE,
      dataHoraSolicitacao: new Date(),
    });

    return desafioCriado.save();
  }

  async consultarDesafios(): Promise<Array<Desafio>> {
    return this.desafioModel
      .find({})
      .populate(['jogadores', 'solicitante', 'partida'])
      .exec();
  }

  async consultarDesafiosPorJogador(
    idJogador: string,
  ): Promise<Array<Desafio>> {
    const jogador = await this.jogadoresService.consultaJogadorPeloId(
      idJogador,
    );
    return this.desafioModel
      .find({ jogadores: jogador })
      .populate(['jogadores', 'solicitante', 'partida'])
      .exec();
  }

  async consultarDesafiosPorSolicitante(
    idSolicitante: string,
  ): Promise<Array<Desafio>> {
    const jogador = await this.jogadoresService.consultaJogadorPeloId(
      idSolicitante,
    );
    return this.desafioModel
      .find({ solicitante: jogador })
      .populate(['jogadores', 'solicitante', 'partida'])
      .exec();
  }

  async consultarDesafiosPorId(_id: string): Promise<Desafio> {
    const desafio = await this.desafioModel
      .findById(_id)
      .populate(['jogadores', 'solicitante', 'partida'])
      .exec();
    if (!desafio) {
      throw new NotFoundException(`Desafio com id ${_id} não encontrado!`);
    }
    return desafio;
  }

  async atualizarDesafio(
    _id: string,
    desafioDto: AtualizarDesafioDto,
  ): Promise<void> {
    await this.consultarDesafiosPorId(_id);
    await this.desafioModel
      .findOneAndUpdate(
        { _id },
        {
          $set: {
            ...desafioDto,
            dataHoraResposta: desafioDto.status ? new Date() : undefined,
          },
        },
      )
      .exec();
  }

  async cancelarDesafio(_id: string): Promise<void> {
    await this.atualizarDesafio(_id, { status: DesafioStatus.CANCELADO });
  }

  async atribuirDesafioPartida(
    _id: string,
    atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
  ): Promise<void> {
    const desafio = await this.consultarDesafiosPorId(_id);

    const { resultado } = atribuirDesafioPartidaDto;

    //const def = await this.jogadoresService.consultaJogadorPeloId(atribuirDesafioPartidaDto.def._id)
    const def = desafio.jogadores.find((j) =>
      j._id.equals(atribuirDesafioPartidaDto.def),
    );
    if (!def) {
      throw new BadRequestException(
        `Vencedor da partida ${atribuirDesafioPartidaDto.def} não faz parte do desafio`,
      );
    }

    const { jogadores, categoria } = desafio;

    // const session = await Mongoose.startSession()
    // session.startTransaction()

    const partida = await this.partidasService.salvarPartida({
      def,
      categoria,
      jogadores,
      resultado,
    });

    await desafio
      .updateOne({
        $set: {
          status: DesafioStatus.REALIZADO,
          partida,
        },
      })
      .exec();

    // await session.commitTransaction()
    // session.endSession()
  }
}
