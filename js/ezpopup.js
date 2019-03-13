function ezAjaxForm(selector) {

    let messege = {
        loading: 'Loading...',
        success: 'Thank you! Your messege sended',
        failure: 'Something wrong :('
    };

    let form = document.querySelector(selector),
        input = form.getElementsByTagName('input'),
        txtarea = form.getElementsByTagName('textarea'),
        statusMessege = document.createElement('div');

    statusMessege.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessege);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); FormData data sender
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        // JSON data sender
        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);
        // request.send(FormData);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessege.innerHTML = messege.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessege.innerHTML = messege.success;
            } else {
                statusMessege.innerHTML = messege.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        };

        for (let i = 0; i < txtarea.length; i++) {
            txtarea[i].value = '';
        };
    });
}