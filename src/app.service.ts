import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASK') private task: any[],
    @Inject('MONGO') private database: Db,
  ) {}
  getHello(): string {
    console.log(this.task);
    return `Hello World! ${this.apiKey}`;
  }

  getTask() {
    const taskCollection = this.database.collection('tasks');
    return taskCollection.find().toArray();
  }
}
