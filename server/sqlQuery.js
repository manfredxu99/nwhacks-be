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
    [body.first_name, body.last_name, body.username, body.password, body.password])
}

exports.registerBeenToLocation = function(body) {
    var queryStr = "";
    return queryStr;
}

exports.registerCovid = function(userId, hasCovid) {
    return mapValues("UPDATE user "+
    "SET has_covid=? " + 
    "WHERE id=?", 
    [hasCovid, userId])
}

exports.getCovidCount = function(body) {
    var queryStr = "";
    return queryStr;
    
}