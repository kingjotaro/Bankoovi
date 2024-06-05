import { Field, InputType, ObjectType } from "type-graphql";
//output
@ObjectType()
export class typeUser {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  taxId: number;

  @Field()
  password: string;
}
//input
@InputType()
export class typeUserInput {
  @Field()
  name: string;

  @Field()
  taxId: number;

  @Field()
  password: string;
}
