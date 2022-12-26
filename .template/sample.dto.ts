import { IsString } from 'class-validator';

export class CreateSampleDto {
  @IsString()
  public sample: string;
}
