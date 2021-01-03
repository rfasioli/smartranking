import * as Mongoose from 'mongoose';

export const PartidaSchema = new Mongoose.Schema(
  {
    categoria: { type: String },
    jogadores: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
      },
    ],
    def: { type: Mongoose.Schema.Types.ObjectId, ref: 'Jogador' },
    resultado: [{ set: { type: String } }],
  },
  {
    timestamps: true,
    collection: 'partidas',
  },
);
