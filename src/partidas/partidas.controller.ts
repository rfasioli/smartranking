import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { CriarPartidaDto } from './dtos/criar-partida.dto';
import { Partida } from './interfaces/partida.interface';
import { PartidasService } from './partidas.service';

@Controller('api/v1/partidas')
export class PartidasController {
  constructor(private readonly partidasService: PartidasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criaDesafio(@Body() criaPartidaDTO: CriarPartidaDto): Promise<Partida> {
    return this.partidasService.criarPartida(criaPartidaDTO);
  }

  @Get()
  async consultarPartidas(): Promise<Partida[]> {
    return this.partidasService.consultarPartidas();
  }

  @Get('/:_id')
  async consultarPartidaPorId(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<Partida> {
    return this.partidasService.consultarPartidaPorId(_id);
  }
}
