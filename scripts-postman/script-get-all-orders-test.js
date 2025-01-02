const jsonData = pm.response.json();

pm.test('Status code is 200', function () {
  pm.response.to.have.status(200);
});

pm.test('Response is an array', function () {
  pm.expect(jsonData).to.be.an('array');
});

pm.test('Array is not empty', function () {
  pm.expect(jsonData.length).to.be.above(0);
});

pm.test('All items have required properties', function () {
  jsonData.forEach((item) => {
    pm.expect(item).to.have.property('id');
    pm.expect(item).to.have.property('customerName');
    pm.expect(item).to.have.property('orderDate');
    pm.expect(item).to.have.property('totalAmount');
    pm.expect(item).to.have.property('status');
  });
});

pm.test('All items have correct property types', function () {
  jsonData.forEach((item) => {
    pm.expect(item.id).to.be.a('string');
    pm.expect(item.customerName).to.be.a('string');
    pm.expect(item.orderDate).to.be.a('string');
    pm.expect(item.totalAmount).to.be.a('string');
    pm.expect(item.status).to.be.a('string');
  });
});

pm.test('Order dates are valid ISO 8601', function () {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  jsonData.forEach((item) => {
    pm.expect(item.orderDate).to.match(iso8601Regex);
  });
});

pm.test('Total amounts are valid numbers', function () {
  jsonData.forEach((item) => {
    const totalAmount = parseFloat(item.totalAmount);
    pm.expect(totalAmount).to.be.a('number');
    pm.expect(totalAmount).to.be.above(0);
  });
});

pm.test('Status values are valid', function () {
  const validStatuses = ['PENDING', 'COMPLETED'];
  jsonData.forEach((item) => {
    pm.expect(validStatuses).to.include(item.status);
  });
});
