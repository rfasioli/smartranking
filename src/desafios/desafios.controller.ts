import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { DesafiosService } from './desafios.service';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto copy';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';
import { DesafioValidacaoParametrosPipe } from './pipes/desafio-validacao.pipe';

@Controller('api/v1/desafios')
export class DesafiosController {
  private readonly logger = new Logger(DesafiosController.name);

  constructor(private readonly desafiosService: DesafiosService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio(
    @Body() criarDesafioDTO: CriarDesafioDto,
  ): Promise<Desafio> {
    this.logger.debug(`m=criarDesafio(dto=${JSON.stringify(criarDesafioDTO)})`);
    return this.desafiosService.criarDesafio(criarDesafioDTO);
  }

  @Post('/:_id/partida')
  @UsePipes(ValidationPipe)
  async atribuirDesafioPartida(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
    @Body() atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
  ): Promise<void> {
    await this.desafiosService.atribuirDesafioPartida(
      _id,
      atribuirDesafioPartidaDto,
    );
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarDesafio(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
    @Body(DesafioValidacaoParametrosPipe)
    atualizarDesafioDto: AtualizarDesafioDto,
  ): Promise<void> {
    await this.desafiosService.atualizarDesafio(_id, atualizarDesafioDto);
  }

  @Get()
  async consultarDesafios(
    @Query('idJogador') idJogador: string,
    @Query('idSolicitante') idSolicitante: string,
  ): Promise<Desafio[]> {
    if (idJogador) {
      return this.desafiosService.consultarDesafiosPorJogador(idJogador);
    }
    if (idSolicitante) {
      return this.desafiosService.consultarDesafiosPorSolicitante(
        idSolicitante,
      );
    }
    return this.desafiosService.consultarDesafios();
  }

  @Get('/:_id')
  async consultarDesafiosPorId(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<Desafio> {
    return this.desafiosService.consultarDesafiosPorId(_id);
  }

  @Delete('/:_id')
  async apagarJogador(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    await this.desafiosService.cancelarDesafio(_id);
  }
}
