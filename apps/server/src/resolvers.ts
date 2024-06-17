import { TransactionResolver } from './resolvers/transactions/TransactionResolver';
import { ByObjectIdResolver } from './resolvers/user/query/ByObjectIdResolver';
import { ByUserTaxIdResolver } from './resolvers/user/query/ByUserTaxIdResolver';
import { CreateUserAndAccountResolver } from './resolvers/user/mutations/CreateUserAndAccountResolver';
import { LoginResolver } from './resolvers/login/loginResolver';



const resolvers = [
  ByObjectIdResolver, 
  ByUserTaxIdResolver, 
  CreateUserAndAccountResolver, 
  LoginResolver, 
  TransactionResolver
] as const;

export { resolvers };
