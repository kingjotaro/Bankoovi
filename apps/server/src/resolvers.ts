import { TransactionResolver } from './resolvers/transactions/TransactionResolver';
import { UserByObjectIdResolver } from './resolvers/user&accounts/query/UserByObjectIdResolver';
import { UserByUserTaxIdResolver } from './resolvers/user&accounts/query/UserByUserTaxIdResolver';
import { CreateUserAndAccountResolver } from './resolvers/user&accounts/mutations/CreateUserAndAccountResolver';
import { DeleteUserAndAccountResolver } from './resolvers/user&accounts/mutations/DeleteUserAndAccountResolver';
import { LoginResolver } from './resolvers/login/loginResolver';
import { AccountByAccountNumberResolver } from './resolvers/user&accounts/query/AccountByAccountNumberResolver';




const resolvers = [
  AccountByAccountNumberResolver,
  UserByObjectIdResolver, 
  UserByUserTaxIdResolver, 
  CreateUserAndAccountResolver, 
  LoginResolver, 
  TransactionResolver,
  DeleteUserAndAccountResolver
] as const;

export { resolvers };
