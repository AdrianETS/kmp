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
    return (user === "Adrian" && pass === "1");
}

function storeAuth(user, pass) {
    window.localStorage.setItem('user', user);
    window.localStorage.setItem('pass', pass);
}

function removeUserCredentials() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('pass');
}

export default { storeAuth, checkCredentials, checkLocalAuth, removeUserCredentials };