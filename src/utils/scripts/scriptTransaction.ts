import axios from 'axios';

const url = 'http://localhost:4000/graphql';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njg0NjA5MDVmZDhmNDlhY2UyYmRkOTMiLCJ0YXhJZCI6MTIzNDU2LCJpYXQiOjE3MjA1NjIyNjAsImV4cCI6MTcyMDU2NTg2MH0._ypyvsOHhyNXU-3GZxUAupbe3rZ4rwl-lhJkaCKL5r8'
};

const query = `
  mutation CreateTransaction($createTransaction: typeCreateTransaction!) {
    createTransaction(createTransaction: $createTransaction) {
      origin
      senderAccount
      senderId
      receiverAccount
      receiverId
      amount
      createdAt
      type
    }
  }
`;

const variables = {
  createTransaction: {
    receiverAccount: 1338, 
    senderAccount: 1337,
    amount: 1,
  }
};

export async function makeTransactions() {
  try {
    const response = await axios.post(url, {
      query: query,
      variables: variables
    }, { headers: headers });
    return response.data;
  } catch (error: any) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return null;
  }
}

export default makeTransactions;
