const express = require('express');
const port = process.env.PORT | 8080;
const app = express()

const countryRouter = require('./routes/country.routes')
const userRouter = require('./routes/users.routes')
const diseaseRouter = require('./routes/disease.routes')
const recordRouter = require('./routes/record.routes')
const diseaseTypeRouter = require('./routes/diseaseType.routes')
const discoveryRouter = require('./routes/discover.routes')
const specializeRouter = require('./routes/specialize.routes')
const publicServantRouter = require('./routes/publicServant.routes')
const doctorRouter = require('./routes/doctor.routes')


app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Accept, X-Custom-Header, Authorization"
    );
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });
  
app.use('/api/country', countryRouter);
app.use('/api/disease', diseaseRouter);
app.use('/api/users', userRouter);
app.use('/api/records', recordRouter);
app.use('/api/diseaseType', diseaseTypeRouter);
app.use('/api/discover', discoveryRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/publicServant', publicServantRouter);

app.use('/api/specialize', specializeRouter);

//app.use('/api/diseaseType', diseaseTypeRouter);


app.listen(port, ()=>{console.log("started");})