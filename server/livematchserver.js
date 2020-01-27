const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

    // const uri = env.MONGO_SRV;
    let gameData = [];
    let score = [];
    let player = "";
    let playerScore = "";
    let count = 0;
    let emitCount = 0;

    io.on('connection', socket => {
        count++;
        let ts = new Date();
        console.log(`${ts.toLocaleDateString()} ${ts.toLocaleTimeString()}: user ${socket.id} connected. total connected: ${count}`)

        socket.on('update', (data) => {
            let ts = new Date();
            socket.broadcast.emit('news', { gameCount: data.gameCount, player: player, playerScore: playerScore, gameNum: data.gameNum, btnClicked: data.clicked })
            emitCount++;
            console.log(`${ts.toLocaleDateString()} ${ts.toLocaleTimeString()}: Emit(${emitCount}) - ${data.clicked} - ${data.gameTitle} ${data.gameCount}`);
            if (data.clicked === 'submit') {
                console.log(`${ts.toLocaleDateString()} ${ts.toLocaleTimeString()}: Score submitted - ${data.gameTitle}`)
            }
        })

        socket.on('message', (data) => {
            socket.broadcast.emit('msg', {msg: data.socket})
        })
        
        socket.on('disconnect', function(){
            count--;
            let ts = new Date();
            console.log(`${ts.toLocaleDateString()} ${ts.toLocaleTimeString()}: user ${socket.id} disconnected. total connected: ${count}`)

        })
    });

    http.listen(7623, function(){
        console.log('Listening on 7623');
    })

        


