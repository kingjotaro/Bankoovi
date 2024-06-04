import { ObjectType, Field, InputType, Float } from "type-graphql";
//output
@ObjectType()
export class Transaction {
  @Field()
  _id: string;

  //string serialization
  @Field()
  transaction_ID: string;

  //string serialization
  @Field()
  receiverAccount: string;

  @Field(() => Float)
  amount: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
//input
@InputType()
export class CreateTransaction {
  //string serialization
  @Field()
  transaction_ID: string;

  //string serialization
  @Field()
  receiverAccount: string;

  @Field(() => Float)
  amount: number;

}
