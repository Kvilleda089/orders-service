const jsonData = pm.response.json();

pm.test('Status code is 200', function () {
  pm.response.to.have.status(200);
});

pm.test('Response contains all required properties', function () {
  pm.expect(jsonData).to.have.property('id');
  pm.expect(jsonData).to.have.property('customerName');
  pm.expect(jsonData).to.have.property('orderDate');
  pm.expect(jsonData).to.have.property('totalAmount');
  pm.expect(jsonData).to.have.property('status');
});

pm.test('Properties have correct types', function () {
  pm.expect(jsonData.id).to.be.a('string');
  pm.expect(jsonData.customerName).to.be.a('string');
  pm.expect(jsonData.orderDate).to.be.a('string');
  pm.expect(jsonData.totalAmount).to.be.a('string');
  pm.expect(jsonData.status).to.be.a('string');
});

pm.test('Order date is in valid ISO 8601 format', function () {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  pm.expect(jsonData.orderDate).to.match(iso8601Regex);
});

pm.test('Total amount is a valid number', function () {
  const totalAmount = parseFloat(jsonData.totalAmount);
  pm.expect(totalAmount).to.be.a('number');
  pm.expect(totalAmount).to.be.above(0);
});
