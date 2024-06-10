import { ObjectType, Field, InputType } from "type-graphql";

//output
@ObjectType()
export class typeAccount {
  @Field()
  _id: string;

  @Field()
  userId: string;

  @Field()
  balance: number;

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

  @Field()
  balance: number;

}
