import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interface/categoria.interface';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    private readonly jogadoresService: JogadoresService,
  ) {}

  async criarCategoria(categoriaDto: CriarCategoriaDto): Promise<Categoria> {
    const { categoria } = categoriaDto;

    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (categoriaEncontrada) {
      throw new BadRequestException(`Categoria ${categoria} já cadastrada`);
    }

    const categoriaCriada = new this.categoriaModel(categoriaDto);
    return categoriaCriada.save();
  }

  async atribuirCategoriaJogador(
    categoria: string,
    idJogador: string,
  ): Promise<Categoria> {
    const categoriaEncontrada = await this.consultarCategoriaPorId(categoria);
    const jogadorEncontrado = await this.jogadoresService.consultaJogadorPeloId(
      idJogador,
    );
    // const jogadorJaCadastradoNaCategoria = await this.categoriaModel.findOne({ categoria }).where('jogadores').in(jogadorEncontrado._id).exec()
    const jogadorJaCadastradoNaCategoria = categoriaEncontrada.jogadores.find(
      (j) => j._id.equals(jogadorEncontrado._id),
    );

    if (jogadorJaCadastradoNaCategoria) {
      throw new BadRequestException(
        `Jogador ${idJogador} já cadastrado na categoria`,
      );
    }

    return categoriaEncontrada.updateOne({
      $push: { jogadores: jogadorEncontrado._id },
    });
  }

  async atualizarCategoria(
    categoria: string,
    categoriaDto: AtualizarCategoriaDto,
  ): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria ${categoria} não encontrada`);
    }

    return this.categoriaModel.findOneAndUpdate(
      { categoria },
      { $set: categoriaDto },
    );
  }

  async consultarTodasCategorias(): Promise<Array<Categoria>> {
    return this.categoriaModel.find({}).populate('jogadores').exec();
  }

  async consultarCategoriaPorId(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .populate('jogadores')
      .exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria ${categoria} não encontrada!`);
    }

    return categoriaEncontrada;
  }

  async consultarCategoriaPorJogador(jogador: Jogador): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ jogadores: jogador._id })
      .exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(
        `Não foi encontrada categoria para o jogador ${jogador.id}`,
      );
    }

    return categoriaEncontrada;
  }
}
