




/* 
export class accountResolver {
    @Query(() => typeAccount)
    async ByTransactionID(@Arg("transaction_ID") transaction_ID: string) {
      let checkquery = await Account.findOne({ transaction_ID: transaction_ID})
      if (checkquery) {
        return checkquery;
      } else throw new Error("Date not found");
    } */