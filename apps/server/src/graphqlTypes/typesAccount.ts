import { ObjectType, Field, InputType, Float } from "type-graphql";
import Decimal from "../utils/decimal";

//output
@ObjectType()
export class typeAccount {
  @Field()
  _id: string;

  //need change this name, same name as transactions 
  @Field()
  transaction_ID: string;
  //string serialization
  @Field()
  userId: string;

  @Field(() => Decimal)
  balance: typeof Decimal;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  token: string;
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
