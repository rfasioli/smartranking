import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { DesafioStatus } from '../interfaces/desafio.interface';

@Injectable()
export class DesafioValidacaoParametrosPipe implements PipeTransform {
  transform(value: any) {
    if (
      value.status &&
      [
        DesafioStatus.ACEITO,
        DesafioStatus.NEGADO,
        DesafioStatus.CANCELADO,
      ].indexOf(value.status) < 0
    ) {
      throw new BadRequestException(
        `O valor do parâmetro status deve ser [ACEITO/NEGADO/CANCELADO]`,
      );
    }
    return value;
  }
}
