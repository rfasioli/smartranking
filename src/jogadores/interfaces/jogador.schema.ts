import * as Mongoose from 'mongoose';

export const JogadorSchema = new Mongoose.Schema(
  {
    email: { type: String, unique: true },
    telefoneCelular: { type: String },
    nome: { type: String },
    ranking: { type: String },
    posicaoRanking: { type: Number },
    urlFotoJogador: { type: String },
  },
  {
    timestamps: true,
    collection: 'jogadores',
  },
);
