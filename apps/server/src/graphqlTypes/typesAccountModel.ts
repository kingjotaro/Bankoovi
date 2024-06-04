import { ObjectType, Field, InputType, Float } from 'type-graphql';
//output
@ObjectType()
export class typeAccount {
  @Field()
  _id: string;
  
  @Field()
  transaction_ID: string;
//string serialization
  @Field()
  userId: string;

  @Field(() => Float)
  balance: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
//input
@InputType()
export class typeAccountInput {
  @Field()
  accountNumber: number;

  @Field()
  userId: string;

  @Field(() => Float, { defaultValue: 0 })
  balance: number;
}
