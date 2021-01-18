function addClass() {
    axios.post('/admin/new/class', {
        name: document.getElementById('name').value,
        year: document.getElementById('year').value,
        image: '/images/'+document.getElementById('chosenImage').class,
        style: document.getElementById('style').value,
        description: description.root.innerHTML,
    }).then(function (response) {
        console.log(response);
    });
}

function addStudent() {
    axios.post('/admin/new/student', {
        name: document.getElementById('name').value,
        image: '/images/'+document.getElementById('chosenImage').class,
        quote: document.getElementById('quote').value,
        body: body.root.innerHTML,
        class: document.getElementById('class').value,
    }).then(function (response) {
        console.log(response);
    });
}