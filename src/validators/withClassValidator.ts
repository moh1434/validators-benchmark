import 'reflect-metadata';
import { User } from '../types';
import { Type, plainToInstance } from 'class-transformer';
import { IsArray, IsNumber, IsString, MinLength, ValidateNested, validate, validateSync } from 'class-validator';

export class UserPosts {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(6)
  content: string;

  @IsNumber()
  userId: number;
}

export class UserValidatorDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserPosts)
  posts: UserPosts[];
}

export const withClassValidator = (data: User) => {
  const user = plainToInstance(UserValidatorDto, data);
  return validateSync(user);
};
