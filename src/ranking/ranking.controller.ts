import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { Ranking } from './interfaces/ranking.interface';
import { RankingService } from './ranking.service';

@Controller('api/v1/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criaRanking(@Body() criaRankingDTO: any): Promise<Ranking> {
    return null;
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarRanking(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
    @Body() atualizarRankingDto: any,
  ): Promise<void> {
    return;
  }

  @Get()
  async consultarRanking(): Promise<Ranking[]> {
    return null;
  }

  @Get('/:_id')
  async consultarRankingPorId(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<Ranking> {
    return null;
  }

  @Delete('/:_id')
  async apagarJogador(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    return;
  }
}
