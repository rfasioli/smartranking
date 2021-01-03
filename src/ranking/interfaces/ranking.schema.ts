import * as Mongoose from 'mongoose';
import { EventoRanking, OperacaoRanking } from './ranking.interface';

export const RankingSchema = new Mongoose.Schema({
  desafio: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Desafio',
  },
  partida: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Partida',
  },
  categoria: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
  },
  jogador: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Jogador',
  },
  evento: { type: EventoRanking },
  operacao: { type: OperacaoRanking },
  pontos: { type: Number },
});
