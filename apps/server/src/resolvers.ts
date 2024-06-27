import { TransactionResolver } from './resolvers/transactions/TransactionResolver';
import { ByObjectIdResolver } from './resolvers/user&accounts/query/UserByObjectIdResolver';
import { UserByUserTaxIdResolver } from './resolvers/user&accounts/query/UserByUserTaxIdResolver';
import { CreateUserAndAccountResolver } from './resolvers/user&accounts/mutations/CreateUserAndAccountResolver';
import { DeleteUserAndAccountResolver } from './resolvers/user&accounts/mutations/DeleteUserAndAccountResolver';
import { LoginResolver } from './resolvers/login/loginResolver';




const resolvers = [
  AccountByNumberResolver,
  ByObjectIdResolver, 
  UserByUserTaxIdResolver, 
  CreateUserAndAccountResolver, 
  LoginResolver, 
  TransactionResolver,
  DeleteUserAndAccountResolver
] as const;

export { resolvers };
