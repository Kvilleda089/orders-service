pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has customerName and totalAmount", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("customerName");
    pm.expect(jsonData).to.have.property("totalAmount");

    pm.expect(jsonData.customerName).to.be.a("string");
    pm.expect(jsonData.totalAmount).to.be.above(0);
});