var templates = {}

templates['nav'] = '<section>' +
  '<a id="logo" target="_blank">' +
  '   <img src="img/rellat_logo.png"></a>' +
  // '<label for="toggle-1" class="nav-toggle-menu">' +
  // '<ul>' +
  // '  <li></li>' +
  // '  <li></li>' +
  // '  <li></li>' +
  // '</ul>' +
  // '</label>' +
  // '<input type="checkbox" id="toggle-1">' +
  // '<nav>' +
  // '  <ul>' +
  // '    <li><a href="#logo"><i class="fa fa-home"></i>Home </a></li>' +
  // '    <li><a href="#about"><i class="fa fa-user"></i>About </a></li>' +
  // '    <li><a href="#portfolio"><i class="fa fa-thumb-tack"></i>Portfolio </a></li>' +
  // '    <li><a href="#services"><i class="fa fa-gears"></i>Services </a></li>' +
  // '    <li><a href="#gallery"><i class="fa fa-picture-o"></i>Gallery </a></li>' +
  // '    <li><a href="#contact"><i class="fa fa-phone"></i>Contact </a></li>' +
  // '  </ul>' +
  // '</nav>' +
  '<nav>' +
  '<a href="#contact">Sign in</a> or <a href="#contact">Sign up</a>' +
  '</nav>'

templates['intro'] = 'Hello, World!!'

templates['login'] = '<div class="login-page">' +
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

templates['header-profile'] = '<a id="header-signout" href="javascript:void(0)">Sign out</a>' +
'<div id="profile-name">{{profileName}}</div><div id="profile-picture"><img src="{{profilePicture}}" width="32px"></div>'

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
  ' <a class="button followed" href="#" title="followed" id= {{userEmail}}>' +
  '   followed' +
  '</a>' +
  '{{/followed}}' +
  '{{#follow}}' +
  ' <a class="button follow" href="#" title="Follow" id= {{userEmail}}>' +
  '   Follow' +
  ' </a>' +
  '{{/follow}}'

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

templates['chat'] =
  '<div id="room-section" class="room-section container clearfix">' +
  '  <div class="room" style="width: 100%;">' +
  '    <div class="room-header clearfix">' +
  '      <div class="room-about">' +
  '        <div class="room-title">Rooms</div>' +
  '        <div id="room-num-rooms" class="room-num-rooms"></div>' +
  '      </div>' +
  '      <i class="fa fa-th-list"></i>' +
  '    </div> <!-- end room-header -->' +
  '    <div id="room-create" class="room-create clearfix" style="border-bottom: 2px solid white;">' +
  '      <input id="room-create-name" type="text" name="title" autofocus placeholder ="Type a new room">' +
  '      <button id="room-create-button">Create</button>' +
  '    </div> <!-- end room-create -->' +
  '    <div id="room-list" class="room-list">' +
  '      <ul>' +
  '          <!-- <a href="#"><li class="room-item">room.title</li></a> -->' +
  '          <!-- <p class="message" style="text-align: center; padding: 0; margin: 0;">Create your first room!</p> -->' +
  '      </ul>' +
  '    </div> <!-- end room-list -->' +
  '  </div> <!-- end room -->' +
  '</div>' +
  '<div id="chat-section" class="chat-section container clearfix">' +
  '  <div class="chat">' +
  '    <div class="chat-header clearfix">' +
  '      <img src="./img/user.jpg" alt="avatar">' +
  '      <div class="chat-about">' +
  '        <div id="chat-room-title" class="chat-room">room.title</div>' +
  '        <div id="chat-num-users" class="chat-num-users"> User(s)</div>' +
  '      </div>' +
  '      <i class="fa fa-users"></i>' +
  '    </div> <!-- end chat-header -->' +
  '    <div id="chat-history" class="chat-history">' +
  '      <ul>' +
  '      </ul>' +
  '    </div> <!-- end chat-history -->' +
  '    <div class="chat-message clearfix">' +
  '      <textarea id="chat-message-text" name="message" placeholder ="Type your message" rows="3"></textarea>' +
  '      <button id="chat-message-button" type="submit">Send</button>' +
  '    </div> <!-- end chat-message -->' +
  '  </div> <!-- end chat -->' +
  '  <div class="controls">' +
  '      <a href="#" id="logout-btn" class="logout-btn">Logout</a>' +
  '  </div>' +
  '  <div id="users-list" class="users-list">' +
  '    <ul class="list">' +
  '    </ul>' +
  '  </div>' +
  '</div> <!-- end container -->'

templates['chat-users'] =
  '{{#users}}' +
  '<li class="clearfix" id="user-{{userId}}">' +
  '      <img src="{{picture}}" alt="{{username}}" />' +
  '      <div class="about">' +
  '      <div class="name">{{username}}</div>' +
  '      <div class="status"><i class="fa fa-circle online"></i> online</div>' +
  '      </div></li>' +
  '{{/users}}'

templates['chat-message'] = '<li>' +
  '    <div class="message-data">' +
  '    <span class="message-data-name">{{username}}</span>' +
  '    <span class="message-data-time">{{date}}</span>' +
  '    </div>' +
  '    <div class="message my-message" dir="auto">{{content}}</div>' +
  '    </li>'

module.exports = templates
