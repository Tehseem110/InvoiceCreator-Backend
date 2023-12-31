const express = require('express');
const app = express();
const port = 3000; // You can use any port you prefer

/// start route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

/// Invoice Routes
const invoiceRoute = require('./src/routes/invoice.routes');

app.use('/invoice', invoiceRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
