generateColor = () => {
    return '#' +  Math.random().toString(16).substr(-6);
}

const users = [];

const addUser = ({ id, name, clientid }) => {
    name = (name.length > 5)? name.trim().substring(0, 5).toLowerCase() : name.trim().toLowerCase();
    color = generateColor();
    const user = { id, name, color, clientid }
    users.push(user);
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);


const getAllUsers = () => {
    return users;
}

module.exports = {
    getAllUsers,
    addUser,
    removeUser,
    getUser
}