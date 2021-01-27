const server = require('./routes/index');
const PORT = process.env.PORT || 4000;





server.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});

