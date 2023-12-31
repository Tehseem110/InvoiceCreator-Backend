const createInvoicePdf = async (req, res) => {
  try {
    res.send({ success: true, message: 'Invoice Created Succusfully' });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = {
  createInvoicePdf,
};
