import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarJogador(jogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = jogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(
        `Jogador com e-mail ${email} já cadastrado`,
      );
    }

    const jogadorCriado = new this.jogadorModel(jogadorDto);
    return jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    jogadorDto: AtualizarJogadorDto,
  ): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findById(_id).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }

    return this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: jogadorDto })
      .exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadorModel.find().exec();
  }

  async consultaJogadorPeloId(_id: string): Promise<Jogador> {
    const jogador = await this.jogadorModel.findById(_id).exec();
    if (!jogador) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
    return jogador;
  }

  async apagarJogador(_id: string): Promise<any> {
    const jogador = await this.jogadorModel.findById(_id).exec();
    if (!jogador) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
    return this.jogadorModel.deleteOne({ _id }).exec();
  }
}
