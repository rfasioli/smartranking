import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { DesafioStatus } from '../interfaces/desafio.interface';

export class AtualizarDesafioDto {
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  dataHoraDesafio?: Date;

  @IsOptional()
  @IsNotEmpty()
  status?: DesafioStatus;
}
