import { ObjectType, Field, InputType, ID } from "type-graphql";

//output
@ObjectType()
export class typeAccount {
  @Field(() => ID)
  _id: string;

   @Field()
  accountNumber: number;

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
  balance: number;

}
