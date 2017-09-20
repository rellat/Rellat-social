var template =

  '<table>' +

  '<tr>' +
  '<th> Friend Emails</th>' +
  '<th> Follow Buttons</th>' +
  '</tr>' +

  '{{#emails}}' +
  '<tr>' +
  '<td> {{email}}</td>' +

  '<td>' +
  '<button>follow</button>' +
  '</td>' +

  '</tr>' +
  '{{/emails}}' +

  '</table>'

module.exports = template