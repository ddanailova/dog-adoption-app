const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_BkruVv-I4";
const kinveyAppSecret = "6151a895531746e3abb861a1f2864e3e";
// Creates the authentication header
function makeAuth(type) {
    return type === 'basic'
        ?  'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
        :  'Kinvey ' + localStorage.getItem('authtoken');
}
function makeUrl(module, endpoint){
    return kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint
}
// Creates request object to kinvey
function makeRequest(method, auth) {
    return  {
        method,
        headers: {
            "Authorization": makeAuth(auth),
            "Content-Type": "application/json"
        }
    };
}
// Function to return GET promise
function get (module, endpoint, auth) {
    return fetch(makeUrl(module, endpoint),makeRequest('GET', auth));
}
// Function to return POST promise
function post (module, endpoint, auth, data) {
    let req = makeRequest('POST', auth);
    req.body= JSON.stringify(data);
    return fetch(makeUrl(module, endpoint),req);
}
// Function to return PUT promise
function update (module, endpoint, auth, data) {
    let req = makeRequest('PUT', auth);
    req.body= JSON.stringify(data);
    return fetch(makeUrl(module, endpoint),req);
}
// Function to return DELETE promise
function remove (module, endpoint, auth) {
    return fetch(makeUrl(module, endpoint),makeRequest('DELETE', auth));
}
export {
    get,
    post,
    update,
    remove
}

