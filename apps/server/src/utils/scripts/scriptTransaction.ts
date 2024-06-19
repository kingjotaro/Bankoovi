import axios from 'axios';

const url = 'http://localhost:4000/graphql';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjY4MDdjMjE0MjliYTIyYTY1ODc4ZTciLCJ0YXhJZCI6MTIzLCJpYXQiOjE3MTg3MzQxNzksImV4cCI6MTcxODczNzc3OX0.jZ-9x01KS7i28cA1Ci4XjJ3EUu6lvWaAXmByzyW2bzw'
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
    amount: 1,
    receiverAccount: 1234, 
    senderAccount: 123
  }
};

export async function makeTransactions() {
  try {
    const response = await axios.post(url, {
      query: query,
      variables: variables
    }, { headers: headers });
    return response.data;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return null;
  }
}

export default makeTransactions;
