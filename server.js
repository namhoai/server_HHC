const express = require('express'),
    path = require('path'),
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
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());


/*MySql connection*/
const connection = require('express-myconnection'),
    mysql = require('mysql');

app.use(

    connection(mysql, {
        host: 'localhost',
        user: 'root',
        password : '123456789',
        // password: '',
        database: 'database_server',
    }, 'request')

);

app.get('/', function (req, res) {
    res.send('connect Sucsess');
});

//RESTful route
const router = express.Router();

router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});


/**
 * ORDER - CUSTOMMER
 */


const customerList = router.route('/:APP_ID/data');

// | GET
// lấy dữ liệu của toàn bộ khách hàng.
customerList.get(function (req, res, next) {

    const APP_ID = req.params.APP_ID;
    if (APP_ID === 'cntg' || APP_ID === 'cvptg' || APP_ID === 'dvvc') {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const textQuery = 'SELECT * FROM ' + APP_ID;
        console.log(textQuery);
        req.getConnection(function (err, conn) {

            if (err) return next("Cannot Connect");

            let mmm = 2;
            const query = conn.query(textQuery, function (err, rows) {

                if (err) {
                    console.log(err);
                    return next("Mysql error, check your query");
                }

                const total = rows.length;
                let unTick = 0;
                rows.forEach((object) => {
                    if (object.tick === 0) {
                        console.log(object.tick);
                        unTick = unTick + 1;
                    }
                });
                const getListIdData = (rows, page, pageSize) => {
                    let data = rows;
                    if (page !== undefined || pageSize !== undefined) {
                        const p2 = total - (page - 1) * pageSize;
                        const p1 = (p2 >= pageSize) ? p2 - pageSize : 0;
                        data = (p2 >= 0) ? rows.slice(p1, p2) : [];
                    }
                    let listItems = [];
                    let items;
                    data.map((item) => {
                        listItems.push(item.id);
                        const memberIds = item.memberIds.split(',');
                        const objectItem = {
                            [item.id]: {
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
                                memberIds: memberIds,
                                time: item.time,
                                tick: item.tick
                            }
                        };
                        items = Object.assign({}, items, objectItem);
                    });
                    return {
                        items,
                        listItems,
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
            data: {
                token: null
            },
            msg: 'Not found !',
            code: 404
        }
        res.send(response);
    }
});

customerList.post(function (req, res, next) {

    //  validation
    req.assert('name', 'Name is required').notEmpty();
    req.assert('phone', 'Phone is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        res.status(422).json(errors);
        return;
    }

    //get data
    const data = {
        name: req.body.name,
        phone: req.body.phone,
        gmail: req.body.gmail,
        fromMove: req.body.fromMove,
        toMove: req.body.toMove,
        dateMove: req.body.dateMove,
        cost: req.body.cost,
        note: req.body.note
    };

    console.log(data);
    // inserting into mysql

    const APP_ID = req.params.APP_ID;
    const textQuery = "INSERT INTO " + APP_ID + " set ? ";

    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        const query = conn.query(textQuery, data, function (err, rows) {

            if (err) {
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
const customer = router.route('/:APP_ID/data/:Id');

/*------------------------------------------------------
route.all is extremely useful. you can use it to do
stuffs for specific routes. for example you need to do
a validation everytime route /api/user/:user_id it hit.
remove logIn2.all() if you dont want it
------------------------------------------------------*/
customer.all(function (req, res, next) {
    console.log("You need to smth about customer Route ? Do it here");
    console.log(req.params);
    next();
});

//get data to update
customer.get(function (req, res, next) {

    const APP_ID = req.params.APP_ID;
    const id = req.params.Id;
    const textQuery = 'SELECT * FROM ' + APP_ID + ' WHERE id = ?';
    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        const query = conn.query(textQuery, [id], function (err, rows) {

            if (err) {
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
            if (rows.length < 1) {
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
customer.put(function (req, res, next) {

    const id = req.params.Id;
    const APP_ID = req.params.APP_ID;
    req.assert('name', 'Name is required').notEmpty();
    req.assert('phone', 'Phone is required').len(10, 12);
    req.assert('fromMove', 'FromMove is required').notEmpty();
    req.assert('toMove', 'ToMove is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        res.status(422).json(errors);
        return;
    }

    const textQuery = "UPDATE " + APP_ID + " set ? WHERE id = ? ";

    const data = {
        name: req.body.name,
        phone: req.body.phone,
        gmail: req.body.gmail,
        fromMove: req.body.fromMove,
        toMove: req.body.toMove,
        dateMove: req.body.dateMove,
        cost: req.body.cost,
        note: req.body.note
    };

    //inserting into mysql
    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        const query = conn.query(textQuery, [data, id], function (err, rows) {

            if (err) {
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

//delete a customer ( or a order )
customer.delete(function (req, res, next) {

    const id = req.params.Id;
    const APP_ID = req.params.APP_ID;
    const textQuery = "DELETE FROM " + APP_ID + "  WHERE id = ? ";
    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        const query = conn.query(textQuery, [id], function (err, rows) {

            if (err) {
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

/**
 * MEMBER
 */

// ALL MEMBER
const allMember = router.route('/member');

allMember.get(function (req, res, next) {
    // lấy các thông số đầu vào
    // do something
    const textQuery = 'SELECT * FROM member';
    // tạo connect và get data trong database. 
    req.getConnection(function (err, conn) {
        // check điều kiện
        if (err) return next("Không thể kết nối !");

        const query = conn.query(textQuery, function (err, rows) {
            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }
            // xử lý dữ liệu trước khi trả về.
            const getMemberIds = (rows) => {
                let data = rows;
                let memberIds = [];
                let members;
                data.map((item) => {
                    memberIds.push(item.id);
                    const objectItem = {
                        [item.id]: {
                            href: item.href,
                            data: {
                                id: item.id,
                                name: item.name,
                                avatar: item.avatar,
                                phone: item.phone,
                                address: item.address,
                                pictureId: item.pictureId,
                                level: item.level,
                                totalApply: item.totalApply,
                                yearBirth: item.yearBirth,
                            }
                        }
                    };
                    members = Object.assign({}, members, objectItem);
                });
                return {
                    members,
                    memberIds
                };
            }

            const dataMembers = getMemberIds(rows);

            const temp = {
                APP_ID: "member",
                version: 1.0,
                page: 0,
                pageSize: 0,
                memberIds: dataMembers.memberIds,
                members: dataMembers.members,
                total: rows.length
            };
            res.send(temp);

        });
    });
});

// Post a new member
allMember.post(function (req, res, next) {
    req.assert('name', 'name is notEmpty !').notEmpty();
    req.assert('phone', 'phone is notEmpty !').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        res.status(422).json(errors);
        return;
    }
    //get data
    const avatar = (req.body.avatar === '') ? req.body.avatar : "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";

    const name = req.body.name;
    let ACC = name.split(' ').slice(-1);
    const fullName = name.split(' ');

    for (let i = 0; i < (fullName.length - 1); i++) {
        ACC = ACC + fullName[i][0];
    }

    const data = {
        name: req.body.name,
        avatar: avatar,
        phone: req.body.phone,
        address: req.body.address,
        pictureId: req.body.pictureId,
        level: 0,
        totalApply: 0,
        yearBirth: req.body.yearBirth,
        href: "https://" + ACC + "/profile"
    };

    console.log(data);
    // inserting into mysql

    const Id = req.params.Id;
    const textQuery = "INSERT INTO member set ? ";

    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        const query = conn.query(textQuery, data, function (err, rows) {
            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            const response = {
                href: href,
                data: {
                    id: rows.insertId,
                    name: data.name,
                    avatar: data.avatar,
                    phone: data.phone,
                    address: data.address,
                    pictureId: data.pictureId,
                    level: 0,
                    totalApply: 0,
                    yearBirth: data.yearBirth,
                }
            }
            res.send(response);
        });
    });
});

// A MEMBER

const member = router.route('/member/:Id');

// get 1 nember or list member
member.get(function (req, res, next) {
    // get info request
    const id = req.params.Id;
    const textQuery = 'SELECT * FROM member WHERE id = ?';
    console.log(textQuery);
    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        const query = conn.query(textQuery, [id], function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            console.log(rows);

            const response = {
                member: {
                    href: rows[0].href,
                    data: {
                        id: rows[0].id,
                        name: rows[0].name,
                        avatar: rows[0].avatar,
                        phone: rows[0].phone,
                        address: rows[0].address,
                        pictureId: rows[0].pictureId,
                        level: rows[0].level,
                        totalApply: rows[0].totalApply,
                        yearBirth: rows[0].yearBirth,
                    }
                }
            }
            res.send(response);
        });
    });
});

// update info a member.
member.put(function (req, res, next) {

    const id = req.params.Id;
    req.assert('name', 'Name is required').notEmpty();
    req.assert('phone', 'Phone is required').len(10, 12);

    const errors = req.validationErrors();
    if (errors) {
        res.status(422).json(errors);
        return;
    }

    const textQuery = "UPDATE member set ? WHERE id = ? ";
    // get name AC from FullName
    const name = req.body.name;
    let ACC = name.split(' ').slice(-1);
    const fullName = name.split(' ');

    for (let i = 0; i < (fullName.length - 1); i++) {
        ACC = ACC + fullName[i][0];
    }

    const data = {
        name: req.body.name,
        avatar: req.body.avatar,
        phone: req.body.phone,
        address: req.body.address,
        pictureId: req.body.pictureId,
        level: req.body.level,
        totalApply: req.body.totalApply,
        yearBirth: req.body.yearBirth,
        href: 'https://' + ACC + '/profile'
    };
    //inserting into mysql
    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        const query = conn.query(textQuery, [data, id], function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            const memberInfo = {
                href: data.href,
                data: {
                    id: data.id,
                    name: data.name,
                    avatar: data.avatar,
                    phone: data.phone,
                    address: data.address,
                    pictureId: data.pictureId,
                    level: data.level,
                    totalApply: data.totalApply,
                    yearBirth: data.yearBirth,
                }
            }

            const response = {
                APP_ID: 'member',
                version: 1.0,
                member: memberInfo,
                msg: 'Thành công !',
                code: 200,
            }
            res.send(response);
        });

    });

});
// delete a member.
member.delete(function (req, res, next) {
    const id = req.params.Id;
    const textQuery = "DELETE FROM member WHERE id = ? ";
    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        const query = conn.query(textQuery, [id], function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            const response = {
                APP_ID: 'member',
                version: 1.0,
                msg: 'Thành công !',
                code: 200,
            }
            res.send(response);

        });
    });
});

/**
 * LOGIN
 */

const logIn = router.route('/login');
//post data to DB | POST
logIn.post(function (req, res, next) {

    //validation
    req.assert('password', 'Enter a password 6 - 20').len(6, 20);

    const errors = req.validationErrors();
    if (errors) {
        res.status(422).json(errors);
        return;
    }

    console.log(req.body);
    // data của client gửi lên.
    let data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
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
        data: {
            token: hash
        },
        msg: 'success',
        code: 200
    };
    console.log('vaochu');
    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        let query = conn.query("SELECT * FROM t_user", function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }
            let check = 0;
            rows.forEach(function (element) {
                console.log(element);
                if (data.username === element.name || data.email === element.email) {
                    if (data.password === element.password) {
                        check = check + 1;
                        res.send(dataCallback);
                    } else {
                        check = check + 1;
                        const response = {
                            data: {
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
                    data: {
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
// let server = app.listen(process.env.PORT || 3000, function () {

    console.log("Listening to port %s", server.address().port);

});
