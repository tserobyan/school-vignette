const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
    .on('error', console.log)
    .once('open', () => {
        console.log('Successfully connected to MongoDB');
    });
