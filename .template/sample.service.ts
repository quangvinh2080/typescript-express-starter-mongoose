import { hash } from 'bcrypt';
import { CreateSampleDto } from '@dtos/samples.dto';
import { HttpException } from '@exceptions/HttpException';
import { Sample } from '@interfaces/samples.interface';
import sampleModel from '@models/samples.model';
import { isEmpty } from '@utils/util';

class SampleService {
  public samples = sampleModel;

  public async findAllSample(): Promise<Sample[]> {
    const samples: Sample[] = await this.samples.find();
    return samples;
  }

  public async findSampleById(sampleId: string): Promise<Sample> {
    if (isEmpty(sampleId)) throw new HttpException(400, "SampleId is empty");

    const findSample: Sample = await this.samples.findOne({ _id: sampleId });
    if (!findSample) throw new HttpException(409, "Sample doesn't exist");

    return findSample;
  }

  public async createSample(sampleData: CreateSampleDto): Promise<Sample> {
    if (isEmpty(sampleData)) throw new HttpException(400, "sampleData is empty");

    const findSample: Sample = await this.samples.findOne({ email: sampleData.email });
    if (findSample) throw new HttpException(409, `This email ${sampleData.email} already exists`);

    const hashedPassword = await hash(sampleData.password, 10);
    const createSampleData: Sample = await this.samples.create({ ...sampleData, password: hashedPassword });

    return createSampleData;
  }

  public async updateSample(sampleId: string, sampleData: CreateSampleDto): Promise<Sample> {
    if (isEmpty(sampleData)) throw new HttpException(400, "sampleData is empty");

    if (sampleData.email) {
      const findSample: Sample = await this.samples.findOne({ email: sampleData.email });
      if (findSample && findSample._id != sampleId) throw new HttpException(409, `This email ${sampleData.email} already exists`);
    }

    if (sampleData.password) {
      const hashedPassword = await hash(sampleData.password, 10);
      sampleData = { ...sampleData, password: hashedPassword };
    }

    const updateSampleById: Sample = await this.samples.findByIdAndUpdate(sampleId, { sampleData });
    if (!updateSampleById) throw new HttpException(409, "Sample doesn't exist");

    return updateSampleById;
  }

  public async deleteSample(sampleId: string): Promise<Sample> {
    const deleteSampleById: Sample = await this.samples.findByIdAndDelete(sampleId);
    if (!deleteSampleById) throw new HttpException(409, "Sample doesn't exist");

    return deleteSampleById;
  }
}

export default SampleService;
