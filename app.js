'use strict';

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/views'));
app.use('/assets', express.static(__dirname + '/public'));

app.use('/', (req,res,next) =>{
    console.log('Request URL: ' + req.url);
    next();
});

/*app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
*/
app.get('/:name', (req, res, next) => {

    var options = {
        root: __dirname + '/views/',
        dotfiles: 'deny',
        header: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = req.params.name;
    res.sendFile(fileName, options, function(err) {
        if(err){
            console.log(err);
            res.status(err.status).end();
        }else{
            console.log('Sent: ', fileName);
        }
        
    });

})

app.listen(port, (err) => {
    if(err) {
        console.log('Server error');
    }else{
        console.log(`Running on port ${port}`);
    }
});