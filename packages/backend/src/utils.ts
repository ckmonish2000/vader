import { HttpException } from '@nestjs/common';
import { RESTError } from './types/RESTError';
import { faker } from '@faker-js/faker';

export function throwHTTPErr(errorData: RESTError): never {
  const { message, statusCode } = errorData;
  throw new HttpException(message, statusCode);
}


export function generateToken(length: number = 2): string {
  const randInt = Math.floor(Math.random() * length);
  const randChar = faker.food.ingredient();
  const person = faker.person.firstName()
  return `${randInt}-${randChar}-${person}`;
}

