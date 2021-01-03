import * as Mongoose from 'mongoose';

export const DesafioSchema = new Mongoose.Schema(
  {
    dataHoraDesafio: { type: Date },
    status: { type: String },
    dataHoraSolicitacao: { type: Date },
    dataHoraResposta: { type: Date },
    solicitante: { type: Mongoose.Schema.Types.ObjectId, ref: 'Jogador' },
    categoria: { type: String },
    jogadores: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
      },
    ],
    partida: { type: Mongoose.Schema.Types.ObjectId, ref: 'Partida' },
  },
  {
    timestamps: true,
    collection: 'desafios',
  },
).index({ dataHoraDesafio: 1, solicitante: 1 }, { unique: true });
