import { Document } from 'mongoose';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Partida } from 'src/partidas/interfaces/partida.interface';

export interface Desafio extends Document {
  dataHoraDesafio: Date;
  status: DesafioStatus;
  dataHoraSolicitacao: Date;
  dataHoraResposta: Date;
  solicitante: Jogador;
  categoria: string;
  jogadores: Array<Jogador>;
  partida: Partida;
}

export enum DesafioStatus {
  ACEITO = 'ACEITO',
  CANCELADO = 'CANCELADO',
  NEGADO = 'NEGADO',
  PENDENTE = 'PENDENTE',
  REALIZADO = 'REALIZADO',
}
