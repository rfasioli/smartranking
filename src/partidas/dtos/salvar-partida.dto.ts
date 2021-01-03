import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
} from 'class-validator';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Resultado } from '../interfaces/partida.interface';

export class SalvarPartidaDto {
  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  jogadores: Array<Jogador>;

  @IsNotEmpty()
  def: Jogador;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  resultado: Array<Resultado>;
}
