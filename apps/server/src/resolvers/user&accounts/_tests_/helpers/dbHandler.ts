import { MongoMemoryReplSet } from 'mongodb-memory-server';
import mongoose, { ConnectOptions } from 'mongoose';

let mongoServer: MongoMemoryReplSet;

export const connect = async () => {
  mongoServer = await MongoMemoryReplSet.create({ replSet: { count: 3 } });
  const uri = mongoServer.getUri();
  
  await mongoose.connect(uri, { dbName: "test", useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
}

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
