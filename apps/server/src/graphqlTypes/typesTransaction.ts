import { ObjectType, Field, InputType, Float } from "type-graphql";
//output
@ObjectType()
export class typeTransaction {
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
export class typeCreateTransaction {
  //string serialization
  @Field()
  transaction_ID: string;

 //string serialization
  @Field()
  senderAccount: string;

  //string serialization
  @Field()
  receiverAccount: string;

  @Field(() => Float)
  amount: number;

}
