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
const server = app.listen(1999);
const io = require('socket.io')(server);

var room_1 = {
        users: [],  // ['Amy', 'Tom', 'Ken', 'ZhiYuan']
        chat_log: [],  // [{username:"Amy", msg:"Hello"}, {message:"Tom", msg:"Great!~~"}, ]
    },
    room_2 = {
        users: [],  
        chat_log: [],
    },
    room_3 = {
        users: [],  
        chat_log: [],
    },
    room_4 = {
        users: [],  
        chat_log: [],
    },
    room_5 = {
        users: [],  
        chat_log: [],
    },
    room_6 = {
        users: [],  
        chat_log: [],
    },
    room_7 = {
        users: [],  
        chat_log: [],
    };

io.on('connection', function(socket) { //2

    // Room 1
    socket.on('room_1_join', function(data) { // first receiving
        console.log("Room 1, Inside Server.js - usr: ", data);

        // Check if the user re-login to the same room, otherwise add in
        let count = 0, loginUser = data;
        for(var i=0; i<room_1['users'].length; i++){
            if(room_1['users'][i] == loginUser){
                count++;
            }
        }
        if (count==0){
            room_1['users'].push(data);
        }
        // -------------------------------
        console.log("Room_1 Obj:", room_1);
        // socket.emit will respond back to the socket client that triggered this listener
        socket.emit('show_room_1', room_1);
    });

    socket.on('room_1_msg', function(data) { // first receiving
        console.log("Room 1, Inside Server.js - msg: ", data);
        room_1['chat_log'].push(data);
        console.log(room_1);
        socket.broadcast.emit('update_chat_room_1', data);
    });
    // =====================================================================================

    // Room 2
    socket.on('room_2_join', function(data) { // first receiving
        console.log("Room 2, Inside Server.js - usr: ", data);

        // Check if the user re-login to the same room, otherwise add in
        let count = 0, loginUser = data;
        for(var i=0; i<room_2['users'].length; i++){
            if(room_2['users'][i] == loginUser){
                count++;
            }
        }
        if (count==0){
            room_2['users'].push(data);
        }
        // -------------------------------
        console.log("Room_2 Obj:", room_2);
        // socket.emit will respond back to the socket client that triggered this listener
        socket.emit('show_room_2', room_2);
    });

    socket.on('room_2_msg', function(data) { // first receiving
        console.log(" Room 2, Inside Server.js - msg: ", data);
        room_2['chat_log'].push(data);
        console.log("Room 2: ", room_2);
        socket.broadcast.emit('update_chat_room_2', data);
    });
    // =====================================================================================

    // Room 3
    socket.on('room_3_join', function(data) { // first receiving
        console.log("Room 3, Inside Server.js - usr: ", data);

        // Check if the user re-login to the same room, otherwise add in
        let count = 0, loginUser = data;
        for(var i=0; i<room_3['users'].length; i++){
            if(room_3['users'][i] == loginUser){
                count++;
            }
        }
        if (count==0){
            room_3['users'].push(data);
        }
        // -------------------------------
        console.log("Room_3 Obj:", room_3);
        // socket.emit will respond back to the socket client that triggered this listener
        socket.emit('show_room_3', room_3);
    });

    socket.on('room_3_msg', function(data) { // first receiving
        console.log(" Room 3, Inside Server.js - msg: ", data);
        room_3['chat_log'].push(data);
        console.log("Room 3: ", room_3);
        socket.broadcast.emit('update_chat_room_3', data);
    });
    // =====================================================================================

    // Room 4
    socket.on('room_4_join', function(data) { // first receiving
        console.log("Room 4, Inside Server.js - usr: ", data);

        // Check if the user re-login to the same room, otherwise add in
        let count = 0, loginUser = data;
        for(var i=0; i<room_4['users'].length; i++){
            if(room_4['users'][i] == loginUser){
                count++;
            }
        }
        if (count==0){
            room_4['users'].push(data);
        }
        // -------------------------------
        console.log("Room_4 Obj:", room_4);
        // socket.emit will respond back to the socket client that triggered this listener
        socket.emit('show_room_4', room_4);
    });

    socket.on('room_4_msg', function(data) { // first receiving
        console.log(" Room 4, Inside Server.js - msg: ", data);
        room_4['chat_log'].push(data);
        console.log("Room 4: ", room_4);
        socket.broadcast.emit('update_chat_room_4', data);
    });
    // =====================================================================================   

    // Room 5
    socket.on('room_5_join', function(data) { // first receiving
        console.log("Room 5, Inside Server.js - usr: ", data);

        // Check if the user re-login to the same room, otherwise add in
        let count = 0, loginUser = data;
        for(var i=0; i<room_5['users'].length; i++){
            if(room_5['users'][i] == loginUser){
                count++;
            }
        }
        if (count==0){
            room_5['users'].push(data);
        }
        // -------------------------------
        console.log("Room_5 Obj:", room_5);
        // socket.emit will respond back to the socket client that triggered this listener
        socket.emit('show_room_5', room_5);
    });

    socket.on('room_5_msg', function(data) { // first receiving
        console.log(" Room 5, Inside Server.js - msg: ", data);
        room_5['chat_log'].push(data);
        console.log("Room 5: ", room_5);
        socket.broadcast.emit('update_chat_room_5', data);
    });
    // =====================================================================================

    // Room 6
    socket.on('room_6_join', function(data) { // first receiving
        console.log("Room 6, Inside Server.js - usr: ", data);

        // Check if the user re-login to the same room, otherwise add in
        let count = 0, loginUser = data;
        for(var i=0; i<room_6['users'].length; i++){
            if(room_6['users'][i] == loginUser){
                count++;
            }
        }
        if (count==0){
            room_6['users'].push(data);
        }
        // -------------------------------
        console.log("Room_6 Obj:", room_6);
        // socket.emit will respond back to the socket client that triggered this listener
        socket.emit('show_room_6', room_6);
    });

    socket.on('room_6_msg', function(data) { // first receiving
        console.log(" Room 6, Inside Server.js - msg: ", data);
        room_6['chat_log'].push(data);
        console.log("Room 6: ", room_6);
        socket.broadcast.emit('update_chat_room_6', data);
    });
    // =====================================================================================    

    // Room 7
    socket.on('room_7_join', function(data) { // first receiving
        console.log("Room 7, Inside Server.js - usr: ", data);

        // Check if the user re-login to the same room, otherwise add in
        let count = 0, loginUser = data;
        for(var i=0; i<room_7['users'].length; i++){
            if(room_7['users'][i] == loginUser){
                count++;
            }
        }
        if (count==0){
            room_7['users'].push(data);
        }
        // -------------------------------
        console.log("Room_7 Obj:", room_7);
        // socket.emit will respond back to the socket client that triggered this listener
        socket.emit('show_room_7', room_7);
    });

    socket.on('room_7_msg', function(data) { // first receiving
        console.log(" Room 7, Inside Server.js - msg: ", data);
        room_7['chat_log'].push(data);
        console.log("Room 7: ", room_7);
        socket.broadcast.emit('update_chat_room_7', data);
    });
    // =====================================================================================    

});





