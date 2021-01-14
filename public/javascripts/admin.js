var image;
function readFile() {
    let file = document.getElementById('image').files[0];
    let reader = new FileReader();
    reader.addEventListener("load", function () {
        image = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

function addClass() {
    axios.post('/admin/new/class', {
        name: document.getElementById('name').value,
        year: document.getElementById('year').value,
        image,
        style: document.getElementById('style').value,
        description: description.root.innerHTML,
    }).then(function (response) {
        console.log(response);
    });
}

function addStudent() {
    axios.post('/admin/new/student', {
        name: document.getElementById('name').value,
        image,
        quote: document.getElementById('quote').value,
        body: body.root.innerHTML,
        class: document.getElementById('class').value,
    }).then(function (response) {
        console.log(response);
    });
}