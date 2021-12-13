import Adapter from "../SanityAdapter";
import { mockClient } from "../../../SanityService/test/testClient";
import {omit} from 'lodash'
const testUser1 = {
  _type: "user",
  emailVerified: new Date(2018, 1, 12, 10, 30),
  _id: "testUser1",
  name: "testName",
  email: "web@konradullrich.com",
};
const testAccount = {
  _type: "account",
  provider: "testProvider",
  providerAccountId: "testProviderAccountId",
  _id: "testAccount_1",
  user: { _ref: "testUser1" },
};

const database: any[] = [testUser1, testAccount];

const testAdapter = (db?:any[]) => {
  return Adapter({ client: mockClient({ database:db ||database }) });
};

describe("Sanity Adapter", () => {
  let client = mockClient({database})
   let adapter = Adapter({client}) 
  beforeEach(()=>{
    client = mockClient({database})
    adapter = Adapter({client}) 
  })
  it("createUser should create and return user ", async () => {
  
    const newUser = await adapter.createUser(omit(testUser1,'_id'))
    expect(newUser).toHaveProperty('id')
    expect(client.getDb().length).toBe(3);
    
  });

  //getUser ------------------------------------------------

  it("getUser should return user if exist", async () => {
    const user = await adapter.getUser("testUser1");
    expect(user).toMatchSnapshot();
  });
  it("getUser should return null if not exist", async () => {
    const user = await adapter.getUser("testUser-null");
    expect(user).toStrictEqual(null);
  });

  //getUserByEmail ------------------------------------------------

  it("getUserByEmail should return user if exist", async () => {
    const user = await adapter.getUserByEmail("web@konradullrich.com");
    expect(user).toMatchSnapshot();
  });
  it("getUserByEmail should return null if not exist", async () => {
    const user = await adapter.getUserByEmail("test@konradullrich.com");
    expect(user).toStrictEqual(null);
  });

  //getUserByAccount  ------------------------------------------------
  it("getUserByEmail should return user if exist", async () => {
    const user = await adapter.getUserByAccount({
      provider: "testProvider",
      providerAccountId: "testProviderAccountId",
    });
    expect(user).toMatchSnapshot();
  });


  // updateUser ------------------------------------------------
  it("getUserByEmail should return user if exist", async () => {
    const updated = { ...omit(testUser1,'_id'),id:'testUser1', name: "updatedName" };
    const updatedUser = await adapter.updateUser(updated);
    expect(updatedUser).toStrictEqual(updated);
    expect(client.getDb().find(i=>i._id === 'testUser1')).toStrictEqual({...testUser1,name: "updatedName"});
  });

 
});

export {};
