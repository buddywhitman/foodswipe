require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const path = require('path');
const { createYoga, createSchema } = require('graphql-yoga');
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
const schema = require(path.resolve(__dirname, '../../client/dist/schema.js'));

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });
const { users } = schema;

const typeDefs = `
  type User {
    id: Int!
    name: String
    email: String
  }

  type FoodItem {
    id: Int!
    name: String!
    description: String
    price: Float!
  }

  type Group {
    id: Int!
    name: String!
    members: [User!]!
    orders: [Order!]!
  }

  type Order {
    id: Int!
    group: Group!
    user: User!
    items: [FoodItem!]!
    status: String!
  }

  type Recommendation {
    id: Int!
    foodItem: FoodItem!
    reason: String
  }

  type Query {
    users: [User!]!
    groups: [Group!]!
    group(id: Int!): Group
    recommendations(userId: Int!): [Recommendation!]!
  }

  type Mutation {
    createGroup(name: String!): Group!
    joinGroup(groupId: Int!, userId: Int!): Group!
    addOrder(groupId: Int!, userId: Int!, itemIds: [Int!]!): Order!
    removeOrder(orderId: Int!): Boolean!
  }
`;

const resolvers = {
  Query: {
    users: async () => db.select().from(users),
    groups: async () => [], // TODO: implement
    group: async (_parent: any, args: { id: number }) => null, // TODO: implement
    recommendations: async (_parent: any, args: { userId: number }) => [], // TODO: implement
  },
  Mutation: {
    createGroup: async (_parent: any, args: { name: string }) => { return { id: 1, name: args.name, members: [], orders: [] }; }, // TODO: implement
    joinGroup: async (_parent: any, args: { groupId: number, userId: number }) => { return { id: args.groupId, name: "Group", members: [], orders: [] }; }, // TODO: implement
    addOrder: async (_parent: any, args: { groupId: number, userId: number, itemIds: number[] }) => { return { id: 1, group: { id: args.groupId, name: "Group", members: [], orders: [] }, user: { id: args.userId, name: "User", email: "" }, items: [], status: "pending" }; }, // TODO: implement
    removeOrder: async (_parent: any, args: { orderId: number }) => true, // TODO: implement
  },
};

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});

// Start the server on port 4000
const { createServer } = require('http');
createServer(yoga).listen(4000, () => {
  console.log('GraphQL Yoga server running at http://localhost:4000/graphql');
}); 