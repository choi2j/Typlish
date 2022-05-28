const express = require('express');
const app = express();
app.set('view engine', 'ejs');


app.listen('8080', () => {
    console.log('listening on 8080');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + './html/index.html');
});