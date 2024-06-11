import { ObjectType, Field, InputType } from "type-graphql";

// output
@ObjectType()
export class typeTransaction {
  @Field()
  _id: string;

  @Field()
  origin: string;

  @Field()
  senderAccount: number; 

  @Field()
  receiverAccount: number; 

  @Field()
  senderId: string; 

  @Field()
  receiverId: string; 

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
  senderAccount: number; 

  @Field()
  receiverAccount: number; 

  @Field()
  amount: number;

}
