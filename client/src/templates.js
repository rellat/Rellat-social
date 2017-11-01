var templates = {}

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

templates['nav-profile'] = '<a class="nav-profile-icon" href="javascript:void(0)"><img alt="Profile picture" src="{{profilePicture}}" width="38px"></a>' +
  '<a class="nav-profile-text" href= "javascript:void(0)"> {{profileName}}</a>'

templates['snsHome'] =
  '<div id = "sns">' +
  '<div class="main-menu">' +
  '<ul>' +
  '    <li>' +
  '        <a href="#">' +
  '            <i class="fa fa-home fa-2x"></i>' +
  '            <span class="div-text">Profile</span>' +
  '        </a>' +
  '    </li>' +
  '    <li class="has-subnav">' +
  '        <a href="#">' +
  '            <i class="fa fa-laptop"></i>' +
  '            <span class="div-text">News Feed</span>' +
  '        </a>' +
  '    </li>' +
  '        <li class="has-subnav">' +
  '        <a href="#">' +
  '            <i class="fa fa-list"></i>' +
  '            <span class="div-text">Chat</span>' +
  '         </a>' +
  '        </li>' +
  '    <li class="has-subnav">' +
  '        <a href="#">' +
  '            <i class="fa fa-folder-open"></i>' +
  '            <span class="div-text">Projects</span>' +
  '        </a>' +
  '    </li>' +
  '    <li>' +
  '        <a href="#">' +
  '            <i class="fa fa-bar-chart-o"></i>' +
  '            <span class="div-text">Games</span>' +
  '        </a>' +
  '    </li>' +
  '    <li>' +
  '        <a href="#">' +
  '            <i class="fa fa-font"></i>' +
  '            <span class="div-text">Typography and Icons</span>' +
  '        </a>' +
  '    </li>' +
  '    <li>' +
  '        <a href="#">' +
  '            <i class="fa fa-table"></i>' +
  '            <span class="div-text">Tables</span>' +
  '        </a>' +
  '    </li>' +
  '    <li>' +
  '        <a href="#">' +
  '            <i class="fa fa-map-marker"></i>' +
  '            <span class="div-text">Maps</span>' +
  '        </a>' +
  '    </li>' +
  '    <li>' +
  '        <a href="#">' +
  '            <i class="fa fa-info"></i>' +
  '            <span class="div-text">Documentation</span>' +
  '        </a>' +
  '    </li>' +
  '    </ul>' +
  '<ul class="logout">' +
  '    <li>' +
  '        <a href="#">' +
  '            <i class="fa fa-power-off"></i>' +
  '            <span class="div-text">Logout</span>' +
  '        </a>' +
  '    </li>' +
  '</ul>' +
  '</div>' +
  '<div class="main-content">' +
  '    <div class="tweetbox-container">' +
  '       <form class="tweetbox">' +
  '        <textarea class="tweetbox-message" placeholder="input your story" rows="4"></textarea>' +
  '        <div class="tweetbox-row">' +
  '            <span class="tweetbox-count">140</span>' +
  '            <button class="tweetbox-button" type="submit" disabled="disabled">Post</button>' +
  '        </div>' +
  '       </form>' +
  '    </div>' +
  '    <div class="feeds">' +
  '    </div>' +
  '</div>' +
  '</div>'

templates['feed'] =
  '{{#feeds}}' +
  '<div class="feed">' +
  '    <img class="feed-user-avatar" src="{{userPicture}}" />' +
  '    <div class = feed-content>' +
  '            <div class="feed-item-header">' +
  '                <div class="feed-user-name">{{userEmail}}</div>' +
  '                <span class= "feed-nick">{{user}}</span>' +
  '                <div class="feed-time" id ="feed-time-{{_id}}"></div>' +
  '            </div>' +
  '        <p class="feed-body">{{contentBody}}</p>' +
  '        <div class="feed-actions">' +
  '            <i class="fa fa-ellipsis-h"></i>' +
  '            <i class="fa fa-heart"></i>' +
  '            <i class="fa fa-retweet"></i>' +
  '            <i class="fa fa-reply"></i>' +
  '        </div>' +
  '    </div>' +
  '</div>' +
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
  '      <div class="chat-message clearfix">' +
  '        <textarea id="chat-message-text" name="message" placeholder ="Type your message" rows="3"></textarea>' +
  '        <button id="chat-message-button" type="submit">Send</button>' +
  '      </div> <!-- end chat-message -->' +
  '    </div> <!-- end chat-history -->' +
  '    <div id="users-list" class="users-list">' +
  '      <ul class="list">' +
  '      </ul>' +
  '    </div>' +
  '  </div> <!-- end chat -->' +
  // '  <div class="controls">' +
  // '      <a href="#" id="logout-btn" class="logout-btn">Logout</a>' +
  // '  </div>' +
  '</div> <!-- end container -->'

templates['chat-users'] =
  '{{#users}}' +
  '<li class="clearfix" id="user-{{userId}}">' +
  '      <img src="{{picture}}" alt="{{username}}" />' +
  '      <div class="about">' +
  '      <div class="name">{{username}}</div>' +
  '      <div class="status"><i class="fa fa-circle {{online}}"></i> {{online}}</div>' +
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
