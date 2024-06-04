import { Decimal128 } from "bson";
import { GraphQLScalarType, Kind } from "graphql";

const Decimal = new GraphQLScalarType({
  name: "Decimal",
  description: "The `Decimal` scalar type to represent currency values using Decimal128",

  serialize(value) {
    
    return value.toString();
  },

  parseValue(value) {
  
    return Decimal128.fromString(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
        // @ts-ignore | TS2339
      throw new TypeError(`${ast.value} is not a valid decimal value.`);
    }
    return Decimal128.fromString(ast.value);
  },
});

export default Decimal;


