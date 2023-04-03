import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class Customer {
  id: number;
  name: string;
  lastName: string;
  phone: string;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
  })
  skills: Types.Array<Record<string, any>>;
}
