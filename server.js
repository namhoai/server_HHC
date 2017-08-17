var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');


app.use(

    connection(mysql,{
        host     : 'localhost',
        user     : 'root',
        password : '123456789',
        database : 't_user',
    },'request')

);

app.get('/',function(req,res){
    res.send('connect Sucsess');
});

//RESTful route
var router = express.Router();


/*------------------------------------------------------
*  This is router middleware,invoked everytime
*  we hit url /api and anything after /api
*  like /api/user , /api/user/7
*  we can use this for doing validation,authetication
*  for every route started with /api
--------------------------------------------------------*/
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

var customerList = router.route('/data');

// | GET
// lấy dữ liệu của toàn bộ khách hàng.
customerList.get(function(req,res,next){

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM data',function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            var temp = {data:rows};
            res.send(temp);

         });

    });

});

customerList.post(function(req,res,next){

//      validation
    req.assert('Name','Name is required').notEmpty();
    req.assert('Phone','Phone is required').notEmpty();
    req.assert('Gmail','A valid email is required').isEmail();
    req.assert('FromMove','FromMove is required').notEmpty();
    req.assert('ToMove','ToMove is required').notEmpty();
    req.assert('DateMove','DataMove is required').notEmpty();
    req.assert('Cost','Cost is required').notEmpty();
    // req.assert('password','Enter a password 6 - 20').len(6,20);

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
        Name:req.body.Name,
        Phone:req.body.Phone,
        Gmail:req.body.Gmail,
        FromMove:req.body.FromMove,
        ToMove:req.body.ToMove,
        DateMove:req.body.DateMove,
        Cost:req.body.Cost,
        Note:req.body.Note
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("INSERT INTO data set ? ",data, function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

            data.Id = rows.insertId;

            res.send(data);

        });

     });

});

// GET - DELETE - PUT.
var customer = router.route('/data/:Id');

/*------------------------------------------------------
route.all is extremely useful. you can use it to do
stuffs for specific routes. for example you need to do
a validation everytime route /api/user/:user_id it hit.
remove logIn2.all() if you dont want it
------------------------------------------------------*/
customer.all(function(req,res,next){
    console.log("You need to smth about customer Route ? Do it here");
    console.log(req.params);
    next();
});

//get data to update
customer.get(function(req,res,next){

    var Id = req.params.Id;
    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM data WHERE Id = ?",[Id],function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            const temp = {data: rows};

            res.send(temp);
        });

    });

});


//update data
customer.put(function(req,res,next){
    var Id = req.params.Id;

    req.assert('Name','Name is required').notEmpty();
    req.assert('Phone','Phone is required').len(10,12);
    req.assert('Gmail','A valid email is required').isEmail();
    req.assert('FromMove','FromMove is required').notEmpty();
    req.assert('ToMove','ToMove is required').notEmpty();
    req.assert('DateMove','DataMove is required').notEmpty();
    req.assert('Cost','Cost is required').notEmpty();
    // req.assert('password','Enter a password 6 - 20').len(6,20);

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
        Name:req.body.Name,
        Phone:req.body.Phone,
        Gmail:req.body.Gmail,
        FromMove:req.body.FromMove,
        ToMove:req.body.ToMove,
        DateMove:req.body.DateMove,
        Cost:req.body.Cost,
        Note:req.body.Note
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE data set ? WHERE Id = ? ",[data,Id], function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });

     });

});

//delete data
customer.delete(function(req,res,next){

    var Id = req.params.Id;

     req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("DELETE FROM data  WHERE Id = ? ",[Id], function(err, rows){

             if(err){
                console.log(err);
                return next("Mysql error, check your query");
             }

             res.sendStatus(200);

        });
        //console.log(query.sql);

     });
});

var logIn = router.route('/login');
//post data to DB | POST
logIn.post(function(req,res,next){

    //validation
    req.assert('password','Enter a password 6 - 20').len(6,20);

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    console.log(req.body);

    // data của client gửi lên.
    let data = {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
     };
    function makeid() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (let i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
    }
    const crypto = require('crypto');
    const secret = makeid();
    const hash = crypto.createHmac('sha256', secret)
                    .update('vuhoainam')
                    .digest('hex');
    const dataCallback = {
        data : {
            token: hash
        },
        msg: 'success',
        code: 200
    };
     console.log('vaochu');
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        let query = conn.query("SELECT * FROM t_user", function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }
            let check = 0;
           rows.forEach(function(element) {
               console.log(element);
              if (data.username === element.name || data.email === element.email) {
                if (data.password === element.password) {
                    check = check + 1;
                    res.send(dataCallback);
                }else {
                    check = check + 1;
                    const response = {
                        data : {
                            token: null
                        },
                        msg: 'Error password',
                        code: 404
                    }
                    res.send(response);    
                }
              }
           }, this);
           if (check === 0) {
               const response = {
                    data : {
                        token: null
                    },
                    msg: 'Error username',
                    code: 404
               }
               res.send(response);
           }
        });
     });

});

//now we need to apply our router here
app.use('/1011961997', router);

//start Server
var server = app.listen(process.env.PORT || 80,function(){

   console.log("Listening to port %s",server.address().port);

});
