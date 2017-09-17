var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

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
        database : 'database_server',
    },'request')

);

app.get('/',function(req,res){
    res.send('connect Sucsess');
});

//RESTful route
var router = express.Router();

router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

const customerList = router.route('/:APP_ID/data');

// | GET
// lấy dữ liệu của toàn bộ khách hàng.
customerList.get(function(req,res,next){

    const APP_ID = req.params.APP_ID;
    if (APP_ID === 'cntg' || APP_ID === 'cvptg' || APP_ID === 'dvvc') {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const textQuery = 'SELECT * FROM ' + APP_ID;
        console.log(textQuery);
        req.getConnection(function(err,conn){
    
            if (err) return next("Cannot Connect");
    
            const query = conn.query(textQuery, function(err,rows){
    
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }
                const total = rows.length;
                let unTick = 0;
                rows.forEach((object)=> {
                    if (object.tick === 0) {
                        console.log(object.tick);
                        unTick = unTick + 1;
                    }
                });
                
                const getListIdData = (rows, page, pageSize) => {
                    let data = rows;
                    if (page !== undefined || pageSize !== undefined) {        
                        const p2 = total - (page - 1)*pageSize;
                        const p1 = (p2 >= pageSize) ? p2 - pageSize : 0;
                        data  = (p2 >= 0 ) ? rows.slice(p1, p2) : [];
                    }
                    data.reverse();
                    let listItems = [];
                    let items;
                    data.map((item) => {
                        listItems.push(item.id);
                        const objectItem = {
                            [item.id] : {
                                id: item.id,
                                user: {
                                    name: item.name,
                                    phone: item.phone,
                                    gmail: item.gmail
                                },
                                order: {
                                    fromMove: item.fromMove,
                                    toMove: item.toMove,
                                    dateMove: item.dateMove,
                                    cost: item.cost,
                                    note: item.note
                                },
                                time: item.time,
                                tick: item.tick
                            }
                        };
                        items = Object.assign({}, items, objectItem);
                    });
                    return {
                        items,
                        listItems
                    };
                }
                
                const dataItems = getListIdData(rows, page, pageSize);

                const temp = {
                    APP_ID: APP_ID,
                    version: 1.0,
                    page: parseInt(page, 10), // trả về theo dữ liệu client gửi lên
                    pageSize: parseInt(pageSize, 10),
                    data: dataItems.items,
                    listItems: dataItems.listItems,
                    msg: 'Bạn có ' + unTick + ' đơn hàng chưa thực thi !',
                    code: 200,
                    total: total
                };
                res.send(temp);
    
             });
    
        });
    } else {
        const response = {
            data : {
                token: null
            },
            msg: 'Not found !',
            code: 404
       }
       res.send(response);
    }
});

customerList.post(function(req,res,next){

    //  validation
    req.assert('name','Name is required').notEmpty();
    req.assert('phone','Phone is required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
        name:req.body.name,
        phone:req.body.phone,
        gmail:req.body.gmail,
        fromMove:req.body.fromMove,
        toMove:req.body.toMove,
        dateMove:req.body.dateMove,
        cost:req.body.cost,
        note:req.body.note
     };

     console.log(data);
    // inserting into mysql

    const APP_ID = req.params.APP_ID;
    const textQuery = "INSERT INTO " + APP_ID + " set ? ";

    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query(textQuery,data, function(err, rows){

            if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
            }
            console.log(rows);
            data.id = rows.insertId;
            const response = {
                APP_ID: APP_ID,
                version: 1.0,
                data: data,
                msg: 'Thành công !',
                code: 200,
            }
            res.send(response);

        });

     });

});

// GET - DELETE - PUT.
// chỉnh sửa dữ liệu của một người
var customer = router.route('/:APP_ID/data/:Id');

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

    const APP_ID = req.params.APP_ID;
    const id = req.params.Id;
    const textQuery = 'SELECT * FROM ' + APP_ID + ' WHERE id = ?';
    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query(textQuery,[id],function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            const response = {
                APP_ID: APP_ID,
                version: 1.0,
                data: rows,
                msg: 'Thành công !',
                code: 200,
            }
            //if user not found
            if(rows.length < 1){
                response.msg = 'User Not found';
                response.data = null;
                response.code = 404;
                return res.send(response);
            }
            res.send(response);
        });

    });

});


//update data
customer.put(function(req,res,next){
    
    const id = req.params.Id;
    const APP_ID = req.params.APP_ID;
    req.assert('name','Name is required').notEmpty();
    req.assert('phone','Phone is required').len(10,12);
    req.assert('fromMove','FromMove is required').notEmpty();
    req.assert('toMove','ToMove is required').notEmpty();
    // req.assert('password','Enter a password 6 - 20').len(6,20);

    const errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    const textQuery = "UPDATE " + APP_ID + " set ? WHERE id = ? ";
    //get data
    const data = {
        name:req.body.name,
        phone:req.body.phone,
        gmail:req.body.gmail,
        fromMove:req.body.fromMove,
        toMove:req.body.toMove,
        dateMove:req.body.dateMove,
        cost:req.body.cost,
        note:req.body.note
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        const query = conn.query(textQuery,[data,id], function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

           const response = {
                APP_ID: APP_ID,
                version: 1.0,
                data: data,
                msg: 'Thành công !',
                code: 200,
            }
            res.send(response);
        });

     });

});

//delete data
customer.delete(function(req,res,next){

    const id = req.params.Id;
    const APP_ID = req.params.APP_ID;
    const textQuery = "DELETE FROM " + APP_ID + "  WHERE id = ? ";
     req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        const query = conn.query(textQuery,[id], function(err, rows){

             if(err){
                console.log(err);
                return next("Mysql error, check your query");
             }

             const response = {
                APP_ID: APP_ID,
                version: 1.0,
                msg: 'Thành công !',
                code: 200,
            }
            res.send(response);

        });
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
app.use('/api', router);

//start Server
let server = app.listen(process.env.PORT || 80,function(){

   console.log("Listening to port %s",server.address().port);

});
