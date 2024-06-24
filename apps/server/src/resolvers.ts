import { TransactionResolver } from './resolvers/transactions/TransactionResolver';
import { ByObjectIdResolver } from './resolvers/user&accounts/query/UserByObjectIdResolver';
import { ByUserTaxIdResolver } from './resolvers/user&accounts/query/UserByUserTaxIdResolver';
import { CreateUserAndAccountResolver } from './resolvers/user&accounts/mutations/CreateUserAndAccountResolver';
import { DeleteUserAndAccountResolver } from './resolvers/user&accounts/mutations/DeleteUserAndAccountResolver';
import { LoginResolver } from './resolvers/login/loginResolver';



const resolvers = [
  ByObjectIdResolver, 
  ByUserTaxIdResolver, 
  CreateUserAndAccountResolver, 
  LoginResolver, 
  TransactionResolver,
  DeleteUserAndAccountResolver
] as const;

export { resolvers };
