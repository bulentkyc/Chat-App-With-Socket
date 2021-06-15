const socket = io();
const clickHandler = () => {
    let msg = document.querySelector('#msg-box');
    socket.emit('chat message', msg.value);
    msg.value = '';
}

socket.emit('nick', sessionStorage.getItem('nick'));

socket.on('nickName', nick => {
    document
    .querySelector('#chat-box')
    .insertAdjacentHTML("beforeend", `<li>Welcome on board ${nick}</li>`);
    sessionStorage.setItem('nick', nick);
});

socket.on('chat msg', msg => {
    document.querySelector('#chat-box').insertAdjacentHTML("beforeend", `<li>${msg}</li>`);
});
