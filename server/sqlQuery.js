function mapValues(query, args) {
    var i = 0;
    const mappedQuery = query.replace(/\?/g,function(){return args[i++]});
    console.log('Mapped Query: ', mappedQuery);
    return mappedQuery;
}

exports.createUser = function(body) {
    return mapValues("INSERT INTO user "+
    "(first_name, last_name, username, password, email) " + 
    "VALUES ('?', '?', '?', '?', '?')", 
    [body.first_name, body.last_name, body.username, body.password, body.email])
}

exports.loginUser = function(body) {
    return mapValues("SELECT COUNT(user.id) "+
    "AS login_success FROM user "+
    "WHERE email='?' AND password='?'", 
    [body.email, body.password])
}

exports.registerBeenToLocation = function(body) {
    return mapValues(
        "call register_been_to_location('?', ?, ?)",
        [body.email, body.lat, body.lon]);
}

exports.registerCovid = function(body) {
    return mapValues("UPDATE user "+
    "SET has_covid=? " + 
    "WHERE email='?'", 
    [body.has_covid, body.email])
}

exports.getCovidCount = function(body) {
    return mapValues(
        "call get_covid_count('?', ?)",
        [body.lat, body.lon]);
}