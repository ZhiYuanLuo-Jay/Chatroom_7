// require express
var express = require("express");
// create the express app
var app = express();

// path module 
var path = require("path");

// static content
app.use(express.static(path.join(__dirname, "./static")));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// setting up npm module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// require session
var session = require('express-session');
app.use(session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// root route to render the index.ejs view
app.get('/', function(req, res) {
    res.render("index");
})

app.post('/login', function(req, res) {
    console.log("POST DATA \n", req.body)
    req.session.info = req.body;
    res.redirect('chatroom')
});

app.get('/chatroom', function(req, res) {
    var info = req.session.info
    res.render("doordash", { usr: info });
})

// using socket
const server = app.listen(9000, function() {
    console.log("listening on port 9000");
});
const io = require('socket.io')(server);

// create rooms 
var rooms =[];
for (var i=0; i<7; i++){
    rooms.push({users:[], chat_log:[]})
}
console.log("rooms: ", rooms)

// var rooms =[{
//         users: [],  // ['Amy', 'Tom', 'Ken', 'ZhiYuan']
//         chat_log: [],  // [{username:"Amy", msg:"Hello"}, {message:"Tom", msg:"Great!~~"},
//     }]

io.on('connection', function(socket) { //2

    // Room 0-6, accept new username, 
    for(let i=0; i<rooms.length; i++){
        socket.on('room'+i, function(data) { // first receiving
            console.log("Inside Server.js - usrname: ", data);

            // Check if the user re-login to the same room, otherwise add in
            let count = 0, loginUser = data;             
            for(var k=0; k < (rooms[i]['users']).length; k++){
                if(rooms[i]['users'][k]==loginUser){count++;}
            }                
            if (count==0){
                rooms[i]['users'].push(data);
            }
            // ==============================================================
            console.log("Room "+ i +" Obj:", rooms[i]);

            // socket.emit will respond back to the socket client that triggered this listener
            socket.emit('show'+i, rooms[i]);
        });
    }

    for(let i=0; i<rooms.length; i++){
        socket.on('room_' + i + '_msg', function(data) { // first receiving
            console.log("Room " + i +", Inside Server.js - msg: ", data);
            rooms[i]['chat_log'].push(data);
            console.log(rooms[i]);
            socket.broadcast.emit('update_chat_room_' + i, data);
        });
    }

});