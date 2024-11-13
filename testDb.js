const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fuelStationDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
    mongoose.connection.close(); // Close connection after testing
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});
