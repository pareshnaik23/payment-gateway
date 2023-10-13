var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postReq = function (request, response) {
    var body = '',
        workingKey = 'E7E3F98D987D58611912DF163B2DB0BC',	//Put in the 32-Bit key shared by CCAvenues.
        accessCode = 'AVSZ05KJ26BA99ZSAB',			//Put in the Access Code shared by CCAvenues.
        encRequest = '',
        formbody = '';

    request.on('data', function (data) {
        body += data;
        encRequest = ccav.encrypt(body, workingKey);
        formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
    });

    request.on('end', function () {
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(formbody);
        response.end();
    });
    return;
};
