'use strict';

const app = require('./app');
const port = process.env.BACKEND_SERVER_PORT || 8000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});