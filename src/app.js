require('dotenv').config();

// START EXPRESS CONFIGURATION
const port = process.env.PORT || 3000;
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
// const fileUpload = require('express-fileupload');
const authMiddleware = require('./middlewares/auth');
const { MAX_FILE_UPLOAD_SIZE } = require('./config/constants');
// const YAML = require('yamljs');
// const https = require("https")
// const fs = require("fs")

const app = express();
app.use(express.json());
app.use(express.text());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('public_static'));
// app.use(fileUpload({
//   limits: { fileSize: MAX_FILE_UPLOAD_SIZE },
// }));

// JWT Auth
app.use(authMiddleware);
// END EXPRESS CONFIGURATION

// START ROUTES
const { authRouter } = require('./routes');

app.use('/v1/auth', authRouter);

// const swaggerDocument = YAML.load(__dirname + '/apiDocs/v1-swagger.yaml');
//
// app.use(
//   '/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument, {explorer: true})
// );
console.log(process.env.MONGODB_URL);
app.listen(port, () => {
  console.log(`Express Listening at http://localhost:${port}`);
});
