function haveAccess() {
    return axios.get('/admin/access');
}
function getAccess() {
    axios.post('/admin/get-access', {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }).then(function (response) {
        return document.cookie = "access=" + response.data + "; expires=2030-03-04T15:42:38.000Z; path=/";
    });
}
function login(){
    document.getElementById('warning').style.display = "none";
    getAccess();
    haveAccess().then(function (response) {
        if (response.data) {
            window.location.href = "/admin";
        } else{
            document.getElementById('warning').style.display = "block";
        }
    });
}