import { mockClient } from "../MockClient";

describe("MockClient", () => {
  it("should have methods fetch ", () => {
    const client = mockClient();

    expect(client).toHaveProperty("fetch");
  });

  it("mockReturnValue should work ", () => {
    const mockReturnValue = { bla: "blu" };
    const client = mockClient({ mockReturnValue });
    expect(client.fetch("*[]")).resolves.toStrictEqual(mockReturnValue);
  });

  it("should run query an return the right Doc's ", () => {
    const database: any[] = [
      { _id: "item2", _type: "item", name: "1" },
      { _id: "item2", _type: "item" },
      { _id: "item3", _type: "item" },
      { _id: "itemB1", _type: "itemB" },
      { _id: "itemB1", _type: "itemB" },
    ];
    const res = database.filter((i) => i._type === "item");
    const client = mockClient({ database });
    expect(client.fetch("*[_type == 'item']")).resolves.toStrictEqual(res);
  });
});
