import { ObjectType, Field, InputType, ID } from "type-graphql";

// output
@ObjectType()
export class typeTransaction {
  @Field(() => ID)
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
