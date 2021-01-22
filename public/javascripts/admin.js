function addClass() {
    axios.post('/admin/new/class', {
        name: document.getElementById('name').value,
        year: document.getElementById('year').value,
        image: '/images/' + document.getElementById('chosenImage').className,
        style: document.getElementById('style').value,
        description: description.root.innerHTML,
    }).then(function (response) {
        window.location.href = "/admin/classrooms";
    });
}

function saveClass(id) {
    axios.post('/admin/edit/class/' + id, {
        id,
        name: document.getElementById('name').value,
        year: document.getElementById('year').value,
        image: '/images/' + document.getElementById('chosenImage').className,
        style: document.getElementById('style').value,
        description: description.root.innerHTML,
    }).then(function (response) {
        window.location.href = "/admin/classrooms";
    });
}

function addStudent() {
    axios.post('/admin/new/student', {
        name: document.getElementById('name').value,
        image: '/images/' + document.getElementById('chosenImage').className,
        quote: document.getElementById('quote').value,
        body: body.root.innerHTML,
        class: document.getElementById('class').value,
    }).then(function (response) {
        console.log(response);
    });
}

function saveStudent(id) {
    axios.post('/admin/edit/student/' + id, {
        id,
        name: document.getElementById('name').value,
        quote: document.getElementById('quote').value,
        image: '/images/' + document.getElementById('chosenImage').className,
        class: document.getElementById('class').value,
        body: body.root.innerHTML,
    }).then(function (response) {
        window.location.href = "/admin/students";
    });
}

function deleteStudent(id) {
    axios.delete('/admin/delete/student/' + id);
    document.getElementById(id).style.display = "none";
}

function deleteClass(id) {
    axios.delete('/admin/delete/class/' + id);
    document.getElementById(id).style.display = "none";
}

function logOut() {
    document.cookie = "access=; expires=2030-03-04T15:42:38.000Z; path=/";
    window.location.href = "/admin";
}

function search() {
    var input = document.getElementById("search");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("table").getElementsByTagName("tr");
    for (let tr of table) {
        if (!(tr.getElementsByTagName('th')[0])) {
            let visible = false;
            let i = 0;
            for (let td of tr.getElementsByTagName('td')) {
                i++;
                if (i == 6) { continue }
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    visible = true
                }
            }
            if (visible) {
                tr.style.display = '';
            } else {
                tr.style.display = 'none';
            }
        }
    }
}