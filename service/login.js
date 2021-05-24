function login() {
    const u = document.getElementById('username-input').value
    const p = document.getElementById('password-input').value

    getData(url = 'https://parseapi.back4app.com/login?' + `username=${u}&password=${p}`)    
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call

        if (data['error'] == null) {
            window.location.href ='./'
        }
      });
}

function signup() {
    const u = document.getElementById('username-input').value
    const p = document.getElementById('password-input').value

    postData(url = 'https://parseapi.back4app.com/users', data = { password:String(p), username: String(u)})
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
      });
}

async function getUsers() {
    let response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    let data = await response.json();
    return data;
  }
//   getUsers().then(data => console.log(data));

async function getData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {

        'X-Parse-Application-Id': 'pen8j01Zc3JaqVkHmMCbZud1AhOaOMeBYTpzlUhw',

        'X-Parse-REST-API-Key': 'GWAMpyqKg5rhHbE9ueXXFdjD3vF3n980YzHRE8SG',

        'X-Parse-Revocable-Session': 1,
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  // Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {

        'X-Parse-Application-Id': 'pen8j01Zc3JaqVkHmMCbZud1AhOaOMeBYTpzlUhw',

        'X-Parse-REST-API-Key': 'GWAMpyqKg5rhHbE9ueXXFdjD3vF3n980YzHRE8SG',

        'X-Parse-Revocable-Session': 1,
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
//   postData('https://example.com/answer', { answer: 42 })



    