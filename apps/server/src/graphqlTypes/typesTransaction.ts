import { ObjectType, Field, InputType } from "type-graphql";

// output
@ObjectType()
export class typeTransaction {
  @Field()
  _id: string;

  @Field()
  origin: string;

  @Field()
  senderAccount: string; 

  @Field()
  receiverAccount: string; 

  @Field()
  amount: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  type: string;

}

// input
@InputType()
export class typeCreateTransaction {

  @Field()
  senderAccount: string; 

  @Field()
  receiverAccount: string; 

  @Field()
  amount: number;

}
