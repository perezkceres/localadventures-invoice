const express = require('express'),
    path = require('path');

const app = express();

// Serve static files
app.use(express.static('./dist/localadventures-invoice-app'));

// Send all requests to index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/localadventures-invoice-app/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 8080, () => {
    console.log('Server started');
})
