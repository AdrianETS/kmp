let adminUsers = ["Adrian","Marcos","Merche","Petr","Zsofia"];

function checkLocalAuth() {
    let user = window.localStorage.getItem('user');
    let pass = window.localStorage.getItem('pass');

    if (user && pass) {
        return checkCredentials(user, pass);
    } else {
        return false;
    }
}

function checkCredentials(user, pass) {
    for(let i = 0; i< adminUsers.length; i++){
        if(user === adminUsers[i]){
            return (user === adminUsers[i] && pass === "1");
        }
    }  
}

function getUserName(){
    return window.localStorage.getItem('user');
}

function storeAuth(user, pass) {
    window.localStorage.setItem('user', user);
    window.localStorage.setItem('pass', pass);

}

function removeUserCredentials() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('pass');
}

export default { storeAuth, checkCredentials, checkLocalAuth, removeUserCredentials, getUserName };