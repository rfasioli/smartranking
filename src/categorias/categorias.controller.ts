import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interface/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    return this.categoriasService.criarCategoria(criarCategoriaDto);
  }

  @Post('/:categoria/jogadores/:idJogador')
  async atribuitCategoriaJogador(@Param() params: string[]): Promise<void> {
    const idCategoria = params['categoria'];
    const idJogador = params['idJogador'];
    await this.categoriasService.atribuirCategoriaJogador(
      idCategoria,
      idJogador,
    );
  }

  @Put('/:categoria')
  @UsePipes(ValidationPipe)
  async atualizarCategoria(
    @Param('categoria') categoria: string,
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<Categoria> {
    return this.categoriasService.atualizarCategoria(
      categoria,
      atualizarCategoriaDto,
    );
  }

  @Get()
  async consultaCategorias(): Promise<Array<Categoria>> {
    return this.categoriasService.consultarTodasCategorias();
  }

  @Get('/:categoria')
  async consultaCategoriaPorId(
    @Param('categoria') categoria: string,
  ): Promise<Categoria> {
    return this.categoriasService.consultarCategoriaPorId(categoria);
  }
}
