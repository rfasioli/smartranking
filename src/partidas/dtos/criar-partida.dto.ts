import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
} from 'class-validator';
import { Resultado } from '../interfaces/partida.interface';

export class CriarPartidaDto {
  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  jogadores: Array<string>;

  @IsNotEmpty()
  def: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  resultado: Array<Resultado>;
}
