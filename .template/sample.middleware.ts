import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';

const sampleMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    // Middleware code ....
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default sampleMiddleware;
