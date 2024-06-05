import { ObjectType, Field, InputType, Float } from "type-graphql";
import Decimal from "../utils/decimal";

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

  @Field(() => Decimal)
  amount: typeof Decimal;

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
