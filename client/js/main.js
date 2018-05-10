'use strict';
console.log('main js worked');

getUser();
function getUser() {
    const xhr = XMLHttpRequest;

    xhr.open('GET', '/articles/add', true);
    xhr.onreadystatechange = (responce) => {
        console.log('responce', responce);
    };
    xhr.send((req) => {
        console.log(req.headers);
        console.log(req.body);
        console.log(req.innerText.id);
        console.log('req', req);
    });
}