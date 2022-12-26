import { Router } from 'express';
import SamplesController from '@controllers/samples.controller';
import { CreateSampleDto } from '@dtos/samples.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class SamplesRoute implements Routes {
  public path = '/samples';
  public router = Router();
  public samplesController = new SamplesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.samplesController.getSamples);
    this.router.get(`${this.path}/:id`, this.samplesController.getSampleById);
    this.router.post(`${this.path}`, validationMiddleware(CreateSampleDto, 'body'), this.samplesController.createSample);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateSampleDto, 'body', true), this.samplesController.updateSample);
    this.router.delete(`${this.path}/:id`, this.samplesController.deleteSample);
  }
}

export default SamplesRoute;
