/* eslint-disable no-unused-expressions */
describe("formApi", () => {
  it("should return formdata", () => {
    const formdata = new FormData();

    const file = new File(["foo"], "testfile.txt", {
      type: "text/plain",
    });
    const file2 = new File(["foo"], "testfile.txt", {
      type: "text/plain",
    });

    formdata.append("testKey", "testValue");
    formdata.append("testKey2", "testValue2");
    formdata.append("testfile", file);
    formdata.append("testfile2", file);

    cy.request({
      url: "/api/test/form",
      method: "POST",
      body: formdata,
      headers: {
        "content-type": "multipart/x-www-form-urlencoded",
        accept: "application/json",
      },
      failOnStatusCode: false,
    }).then((response) => {
      const body = JSON.parse(
        Cypress.Blob.arrayBufferToBinaryString(response.body)
      );
      cy.log(body);
      expect(body.formData?.fields.testKey).eq("testValue");
      expect(body.formData?.fields.testKey2).be.undefined;
      expect(body.formData?.files.testfile.originalFilename).eq("testfile.txt");
      expect(body.formData?.files.testfile2).be.undefined;
    });
  });
});
