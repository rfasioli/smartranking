import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { PartidaSchema } from './interfaces/partida.schema';
import { PartidasService } from './partidas.service';
import { PartidasController } from './partidas.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Partida', schema: PartidaSchema }]),
    JogadoresModule,
    CategoriasModule,
  ],
  providers: [PartidasService],
  exports: [PartidasService],
  controllers: [PartidasController],
})
export class PartidasModule {}
