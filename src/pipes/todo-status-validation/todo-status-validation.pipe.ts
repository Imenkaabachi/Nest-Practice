import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {TodoStatusEnum} from "../../todo/models/TodoStatusEnum";

@Injectable()
export class TodoStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = Object.assign([],TodoStatusEnum);

  transform(value: any) {

    // value=value.toUpperCase();

    if (!this.isStatusValid(value)){
      throw new BadRequestException('"${value}" is an invalid status');
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
