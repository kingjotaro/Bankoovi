import { InputType, Field, ID } from "type-graphql";

@InputType()
export class typeDeleteUser {
  @Field(() => ID)
  _id: string;

  @Field()
  taxId: number;
}

@InputType()
export class typeDeleteAccount {
  @Field(() => ID)
  _id: string;

  @Field()
  accountNumber: number;
}
