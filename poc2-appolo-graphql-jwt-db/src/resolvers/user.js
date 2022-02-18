const user = (parent, args, context, info) => {
    console.log('in user function ');
    return {
        id: "",
        username: ""
    }
}

module.exports = {
    user
}
