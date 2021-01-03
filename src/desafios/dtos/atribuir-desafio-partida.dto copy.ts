import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Resultado } from 'src/partidas/interfaces/partida.interface';

export class AtribuirDesafioPartidaDto {
  @IsNotEmpty()
  def: Jogador;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  resultado: Array<Resultado>;
}
