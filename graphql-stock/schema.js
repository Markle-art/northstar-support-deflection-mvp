import { createSchema } from 'graphql-yoga';

const inventory = [
  {
      id: '1',
          name: 'Laptop',
              inStock: true,
                  quantity: 5
                    },
                      {
                          id: '2',
                              name: 'Wireless Mouse',
                                  inStock: true,
                                      quantity: 12
                                        },
                                          {
                                              id: '3',
                                                  name: 'Keyboard',
                                                      inStock: false,
                                                          quantity: 0
                                                            }
                                                            ];

                                                            export const schema = createSchema({
                                                              typeDefs: /* GraphQL */ `
                                                                  type Item {
                                                                        id: ID!
                                                                              name: String!
                                                                                    inStock: Boolean!
                                                                                          quantity: Int!
                                                                                              }

                                                                                                  type Query {
                                                                                                        stock(itemId: ID!): Item
                                                                                                            }
                                                                                                              `,

                                                                                                                resolvers: {
                                                                                                                    Query: {
                                                                                                                          stock: (_, { itemId }) => {
                                                                                                                                  return inventory.find(item => item.id === itemId) || null;
                                                                                                                                        }
                                                                                                                                            }
                                                                                                                                              }
                                                                                                                                              });