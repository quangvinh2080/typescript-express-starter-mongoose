import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateSampleDto } from '@dtos/samples.dto';
import SamplesRoute from '@routes/samples.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Samples', () => {
  describe('[GET] /samples', () => {
    it('response fineAll Samples', async () => {
      const samplesRoute = new SamplesRoute();
      const samples = samplesRoute.samplesController.sampleService.samples;

      samples.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          email: 'a@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          _id: 'alskdjfhg',
          email: 'b@email.com',
          password: await bcrypt.hash('a1s2d3f4!', 10),
        },
        {
          _id: 'zmxncbv',
          email: 'c@email.com',
          password: await bcrypt.hash('z1x2c3v4!', 10),
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([samplesRoute]);
      return request(app.getServer()).get(`${samplesRoute.path}`).expect(200);
    });
  });

  describe('[GET] /samples/:id', () => {
    it('response findOne Sample', async () => {
      const sampleId = 'qpwoeiruty';

      const samplesRoute = new SamplesRoute();
      const samples = samplesRoute.samplesController.sampleService.samples;

      samples.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        email: 'a@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([samplesRoute]);
      return request(app.getServer()).get(`${samplesRoute.path}/${sampleId}`).expect(200);
    });
  });

  describe('[POST] /samples', () => {
    it('response Create Sample', async () => {
      const sampleData: CreateSampleDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
      };

      const samplesRoute = new SamplesRoute();
      const samples = samplesRoute.samplesController.sampleService.samples;

      samples.findOne = jest.fn().mockReturnValue(null);
      samples.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: sampleData.email,
        password: await bcrypt.hash(sampleData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([samplesRoute]);
      return request(app.getServer()).post(`${samplesRoute.path}`).send(sampleData).expect(201);
    });
  });

  describe('[PUT] /samples/:id', () => {
    it('response Update Sample', async () => {
      const sampleId = '60706478aad6c9ad19a31c84';
      const sampleData: CreateSampleDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
      };

      const samplesRoute = new SamplesRoute();
      const samples = samplesRoute.samplesController.sampleService.samples;

      if (sampleData.email) {
        samples.findOne = jest.fn().mockReturnValue({
          _id: sampleId,
          email: sampleData.email,
          password: await bcrypt.hash(sampleData.password, 10),
        });
      }

      samples.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: sampleId,
        email: sampleData.email,
        password: await bcrypt.hash(sampleData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([samplesRoute]);
      return request(app.getServer()).put(`${samplesRoute.path}/${sampleId}`).send(sampleData);
    });
  });

  describe('[DELETE] /samples/:id', () => {
    it('response Delete Sample', async () => {
      const sampleId = '60706478aad6c9ad19a31c84';

      const samplesRoute = new SamplesRoute();
      const samples = samplesRoute.samplesController.sampleService.samples;

      samples.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: 'test@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([samplesRoute]);
      return request(app.getServer()).delete(`${samplesRoute.path}/${sampleId}`).expect(200);
    });
  });
});
