var request = require('request')
var tokenManager = require('./../auth')
var mustache = require('mustache')

module.exports.postFeed = function(contentTitle, contentBody) {
  var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/v1/feed/postFeed',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-key': 'dldnjswo19@gmail.com',
        'x-access-token': localStorage.getItem('token')
      },
    body:{
      user: 'wonjerry',
      userEmail: 'dldnjswo19@gmail.com',
      userImage: '',
      contentTitle: contentTitle,
      contentBody: contentBody
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)

    var target = document.getElementById("feedListTarget")
    target.innerHTML = body
    /*
    target.innerHTML = mustache.render('{{#feeds}}' +
      '    <article class="card-60 social">\n' +
      '        <div class="flex-content">\n' +
      '            <header>\n' +
      '                <p class="user">\n' +
      '                    <a class="button follow" href="#" title="Follow" id= {{userEmail}}>' +
      '                        Follow' +
      '                    </a>\n' +
      '                    <img class="avatar-32" alt="Avatar" src={{userImage}}>\n' +
      '                    <strong>\n' +
      '                        <a title="Full Name" href="#">' +
      '                            {{user}}' +
      '                        </a>\n' +
      '                    </strong>\n' +
      '                    <span></span>\n' +
      '                </p>\n' +
      '            </header>\n' +
      '            <h2>' +
      '                {{contentTitle}}' +
      '            </h2>' +
      '            <p>' +
      '                {{contentBody}}' +
      '            </p>' +
      '            <footer>\n' +
      '                <p>\n' +
      '                    <a class="bt-love" title="Love" href="#">Love</a>' +
      '                    <a class="bt-comment" title="Comment" href="#">Comment</a>\n' +
      '                </p>\n' +
      '            </footer>\n' +
      '        </div>\n' +
      '        <!-- end .flex-content-->\n' +
      '    </article>\n' +
      '{{/feeds}}',data)
      */
    // redirect to user page


  })


}