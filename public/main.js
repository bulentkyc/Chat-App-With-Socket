const socket = io();
const $ = selector => document.querySelector(selector);
const listEnumerable = ['channels', 'users']
const state = {
    list: 0,
    users:[],
    channels:[]
};
const switchHandler = () => {
    //alert(state.list);
    switch (state.list) {
        case 0:
            state.list = 1;
            break;
            
        case 1:
            state.list = 0;
                break;
    
        default:
            alert(`There's problem please try again later`)
            break;
    }
    alert(state.list)
}

const listManager = (list) => {
    console.log(list)
    //list.forEach(item => $('#user-channel-list').insertAdjacentHTML('beforeend', `<li>${item}</li>`));
}

socket.on('users', users => {
    state.users = users;
    listManager(state.users);
});

socket.on('channels', channels => {
    state.channels = channels;
    listManager(state.channels);
});

const clickHandler = () => {
    let msg = $('#msg-box');
    socket.emit('chat message', msg.value);
    msg.value = '';
}

socket.emit('token', sessionStorage.getItem('token'));

socket.on('ticket', ticket => {
    document
    .querySelector('#chat-box')
    .insertAdjacentHTML("beforeend", `<li>Welcome on board ${ticket.nickName}</li>`);
    sessionStorage.setItem('token', ticket.token);
});

socket.on('chat msg', msg => {
    document.querySelector('#chat-box').insertAdjacentHTML("beforeend", `<li>${msg}</li>`);
});
