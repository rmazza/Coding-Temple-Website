'use strict';

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/views'));
app.use('/assets', express.static(__dirname + '/public'));

app.use('/', (err,req,res,next) =>{
    if(err){
        console.log(err);
        res.send("Something went wrong!");
    }else{
        console.log('Request URL: ' + req.url)
        next();
    }
});

app.get('/cs/:name', (req, res, next) => {

    var options = {
        root: __dirname + '/views/',
        dotfiles: 'deny',
        header: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = req.params.name + ".html";
    res.sendFile(fileName, options, function(err) {
        if(err){
            console.log(err);
            res.send("404 - PAGE DOES NOT EXIST");
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