import { Document } from 'mongoose';
import { Partida } from 'src/partidas/interfaces/partida.interface';
import { Desafio } from 'src/desafios/interfaces/desafio.interface';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export interface Ranking extends Document {
  desafio: Desafio;
  partida: Partida;
  categoria: string;
  jogador: Jogador;
  evento: EventoRanking;
  operacao: OperacaoRanking;
  pontos: number;
}

export enum EventoRanking {
  VITORIA = 'VITORIA',
  VITORIA_LIDER = 'VITORIA_LIDER',
  DERROTA = 'DERROTA',
}

export enum OperacaoRanking {
  INCREMENTA = '+',
}
