const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/eliteworld').then(async () => {
  const db = mongoose.connection.db;
  const sol = await db.collection('mobilitysolutions').findOne();
  console.log(JSON.stringify(sol, null, 2));
  process.exit(0);
});
