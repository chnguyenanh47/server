import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
export function GenerateId() {
  return applyDecorators(
    IsInt(),
    Min(0),
    Transform(({ value }) => value ?? Math.floor(Math.random() * 1000000)),
  );
}
