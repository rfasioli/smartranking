import { JogadoresModule } from './jogadores/jogadores.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';
import { PartidasModule } from './partidas/partidas.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    CategoriasModule,
    JogadoresModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:oCFlmZHN5iO2xNzw@cluster0.bisdp.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    DesafiosModule,
    PartidasModule,
    RankingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
