const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine','html');

app.use(express.static(__dirname + '/views'));
app.use('/assets', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/courses.html', (req, res) => {
    res.sendFile('courses.html');
})

app.listen(port, (err) => {
    if(err) {
        console.log('Server error');
    }else{
        console.log(`Running on port ${port}`);
    }
});