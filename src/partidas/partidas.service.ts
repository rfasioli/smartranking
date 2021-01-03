import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CriarPartidaDto } from './dtos/criar-partida.dto';
import { SalvarPartidaDto } from './dtos/salvar-partida.dto';
import { Partida } from './interfaces/partida.interface';

@Injectable()
export class PartidasService {
  constructor(
    @InjectModel('Partida') private readonly partidaModel: Model<Partida>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService,
  ) {}

  async criarPartida(partidaDto: CriarPartidaDto): Promise<Partida> {
    const resultado = partidaDto.resultado;
    const def = await this.jogadoresService.consultaJogadorPeloId(
      partidaDto.def,
    );
    const { categoria } = await this.categoriasService.consultarCategoriaPorId(
      partidaDto.categoria,
    );

    const jogadores = await Promise.all(
      partidaDto.jogadores.map((j) => {
        return this.jogadoresService.consultaJogadorPeloId(j);
      }),
    );

    return this.salvarPartida({
      def,
      jogadores,
      categoria,
      resultado,
    });
  }

  async salvarPartida(partida: SalvarPartidaDto): Promise<Partida> {
    const partidaCriada = new this.partidaModel(partida);
    return partidaCriada.save();
  }

  async consultarPartidas(): Promise<Array<Partida>> {
    return this.partidaModel.find({}).exec();
  }

  async consultarPartidaPorId(_id: string): Promise<Partida> {
    const partidaEncontrada = this.partidaModel.findById(_id).exec();
    if (!partidaEncontrada) {
      throw new NotFoundException(`Partida com id ${_id} não encontrada!`);
    }
    return partidaEncontrada;
  }
}
