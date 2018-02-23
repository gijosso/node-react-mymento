  const User = (state = [], action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            alert("test");
            return {
                username: 'toto',
                password: 'sex',
            };
        case 'USER_LOGOUT':
            return {
                ...state,
                error_msg: 'IN'
            };
        case 'UPLOAD':
            return state.map(todo => {
                    alert(todo.val);
                    return todo.val;
                }
            );
        default:
            return state
    }
};

/*function login(username, password) {
      return fetch('http://localhost:6969/api/user/logIn', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
              username: username,
              password: password,
          })
      }).then((response) => response.json())
          .then((responseJson) => {
                alert("test");
              return responseJson;
          })
          .catch((error) => {
              console.error(error);
          });
  }*/

export default User;