import { Field, InputType, ObjectType } from 'type-graphql';
//output
@ObjectType()
export class typeAccount {
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
export class typeAccountInput {
  @Field()
  name: string;

  @Field()
  taxId: number;

  @Field()
  password: string;
}
