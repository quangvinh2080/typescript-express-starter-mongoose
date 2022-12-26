import { NextFunction, Request, Response } from 'express';
import { CreateSampleDto } from '@dtos/samples.dto';
import { Sample } from '@interfaces/samples.interface';
import samplesService from '@services/samples.service';

class SamplesController {
  public sampleService = new samplesService();

  public getSamples = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSampleData: Sample[] = await this.sampleService.findAllSample();

      res.status(200).json({ data: findAllSampleData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSampleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sampleId: string = req.params.id;
      const findOneSampleData: Sample = await this.sampleService.findSampleById(sampleId);

      res.status(200).json({ data: findOneSampleData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSample = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sampleData: CreateSampleDto = req.body;
      const createSampleData: Sample = await this.sampleService.createSample(sampleData);

      res.status(201).json({ data: createSampleData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSample = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sampleId: string = req.params.id;
      const sampleData: CreateSampleDto = req.body;
      const updateSampleData: Sample = await this.sampleService.updateSample(sampleId, sampleData);

      res.status(200).json({ data: updateSampleData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSample = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sampleId: string = req.params.id;
      const sampleSampleData: Sample = await this.sampleService.deleteSample(sampleId);

      res.status(200).json({ data: sampleSampleData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SamplesController;
