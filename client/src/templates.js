var templates = {}

templates['login'] =
  '<div class="login-page">' +
  '    <div class="form">' +
  '        <form name="loginForm" id="login-form">' +
  '            <input type="email" placeholder="user email" autocomplete="username" name="identifier" id="identifierId"/>' +
  '            <input type="password" placeholder="password" autocomplete="password" name="password" id="passwordId"/>' +
  '            <input type="submit" name="submit" value="login"/>' +
  '            <p class="message">Not registered? <a href="#" id="go-register">Create an account</a></p>' +
  '        </form>' +
  '        <form name="registerForm" id="register-form">' +
  '            <input type="email" name="identifier" placeholder="email address"/>' +
  '            <input type="password" name="password" placeholder="password"/>' +
  '            <input type="text" name="username" placeholder="name"/>' +
  '            <input type="submit" name="submit" value="create"/>' +
  '            <p class="message">Already registered? <a href="#" id="go-login">Sign In</a></p>' +
  '        </form>' +
  '    </div>' +
  '</div>'

templates['snsHome'] =
  '<textarea rows="4" cols="50" placeholder="input your story"></textarea>' +
  '<button id=\'postFeedBtn\'>POST</button>' +
  '<main id="feedList">' +
  '</main>'

templates['feed'] =
  '{{#feeds}}' +
  '    <article class="card-60 social">' +
  '        <div class="flex-content">' +
  '            <header>' +
  '                <p class="user">' +
  '                    {{#followed}}' +
  '                        <a class="button followed" href="#" title="followed" id= {{userEmail}}>' +
  '                            followed' +
  '                        </a>' +
  '                    {{/followed}}' +
  '                    {{#follow}}' +
  '                    <a class="button follow" href="#" title="Follow" id= {{userEmail}}>' +
  '                        Follow' +
  '                    </a>' +
  '                    {{/follow}}' +
  '                    <img class="avatar-32" alt="Avatar" src=./img/user.jpg>' +
  '                    <strong>' +
  '                        <a title="Full Name" href="#">' +
  '                            {{user}}' +
  '                        </a>' +
  '                    </strong>' +
  '                    <!--여기에 date 있었음 -->' +
  '                </p>' +
  '            </header>' +
  '            <h2>' +
  '                {{contentTitle}}' +
  '            </h2>' +
  '            <p>' +
  '                {{contentBody}}' +
  '            </p>' +
  '            <footer>' +
  '                <p>' +
  '                    <a class="bt-love" title="Love" href="#">' +
  '                        Love' +
  '                    </a>' +
  '                    <a class="bt-comment" title="Comment" href="#">' +
  '                        Comment' +
  '                    </a>' +
  '                </p>' +
  '            </footer>' +
  '        </div>' +
  '        <!-- end .flex-content-->' +
  '    </article>' +
  '{{/feeds}}'

templates['follow'] = '{{#followed}}' +
  '                        <a class="button followed" href="#" title="followed" id= {{userEmail}}>' +
  '                            followed' +
  '                        </a>' +
  '                    {{/followed}}' +
  '                    {{#follow}}' +
  '                    <a class="button follow" href="#" title="Follow" id= {{userEmail}}>' +
  '                        Follow' +
  '                    </a>' +
  '                    {{/follow}}'

// 이건 나중에 변경
templates['users'] =
  '<table>' +
  '  <tr>' +
  '    <th> Friend\'s Email</th>' +
  '    <th> Follow Buttons</th>' +
  '  </tr>' +
  '  {{#emails}}' +
  '    <tr>' +
  '      <td> {{email}}</td>' +
  '      <td>' +
  '        <button class = "followBtn" id = {{email}} >follow</button>' +
  '      </td>' +
  '    </tr>' +
  '  {{/emails}}' +
  '</table>'

//<span>date</span>
module.exports = templates