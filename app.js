const express = require('express');
const app = express();

var lockStatus = [false,false,false];



app.get('/lockStatus',function(req,res){
  res.send(lockStatus);
});
app.get('/lock0',function(req,res){
  if(req.query.action === 'lock'){
    lockStatus[0] = true;
  }
  else if(req.query.action == 'unlock'){
    lockStatus[0] = false;
  }
  else{
    lockStatus[0] ^= true;
  }
  res.sendStatus(200);
});
app.get('/lock1',function(req,res){
  if(req.query.action === 'lock'){
    lockStatus[1] = true;
  }
  else if(req.query.action == 'unlock'){
    lockStatus[1] = false;
  }
  else{
    lockStatus[1] ^= true;
  }
  res.sendStatus(200);
});
app.get('/lock2',function(req,res){
  if(req.query.action === 'lock'){
    lockStatus[2] = true;
  }
  else if(req.query.action == 'unlock'){
    lockStatus[2] = false;
  }
  else{
    lockStatus[2] ^= true;
  }

  res.sendStatus(200);
});


app.use(express.static('./'));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
})
