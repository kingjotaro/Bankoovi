import axios from 'axios';

const url = 'http://localhost:4000/graphql';
const headers = {
  'Content-Type': 'application/json',
};

const query = `
mutation Mutation($createTransaction: typeCreateTransaction!) {
  createTransaction(createTransaction: $createTransaction) {
    _id
    amount
    createdAt
    receiverAccount
    senderAccount
    type
    updatedAt
    origin
  }
}
`;

const variables = {
  'createTransaction': {
    'amount': 1,
    'receiverAccount': '66665971465963f92f6e7724',
    'senderAccount': '66665982465963f92f6e772a'
  }
};

export async function makeTransactions()  {
  try {
    const response = await axios.post(url, {
      query: query,
      variables: variables
    }, { headers: headers });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export default makeTransactions;
