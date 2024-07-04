import axios from 'axios';

const url = 'http://localhost:4000/graphql';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njg0NjA5MDVmZDhmNDlhY2UyYmRkOTMiLCJ0YXhJZCI6MTIzNDU2LCJpYXQiOjE3MjAwNDM2NzEsImV4cCI6MTcyMDA0NzI3MX0.aipNltP47koan8QC7LPjXVP2gCag5GO0aWnX9vNE6FM'
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
    receiverAccount: 1337, 
    senderAccount: 1338,
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
