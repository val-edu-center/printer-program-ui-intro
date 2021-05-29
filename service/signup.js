function signup() {
    const f = document.getElementById('first-name-input').value
    const l = document.getElementById('last-name-input').value
    const u = document.getElementById('username-input').value
    const p = document.getElementById('password-input').value

    postDataParse(url = 'https://parseapi.back4app.com/users', data = { password:String(p), username: String(u)})
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
      });


    postData(url = 'localhost:9200/users/', data= { firstName: f, lastName: l, username: u})
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
      });
}


async function getDataParse(url = '', data = {}) {
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
async function postDataParse(url = '', data = {}) {
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


async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {

      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
    