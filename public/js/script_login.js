document.addEventListener('DOMContentLoaded', (event) => {
  const loginButton = document.getElementById('login_button');
  loginButton.addEventListener('click', loginButtonPressed);
});

const loginButtonPressed = () => {
  const usernameValue = document.getElementById('username').value;
  const passwordValue = document.getElementById('password').value;
  
  if (usernameValue && passwordValue) {
    getUserData(usernameValue).then((userData) => {
      userData?.password === passwordValue ? alert('You have been logged successfuly!') : alert('It has not been possible to Log In!');
    }).catch((err) => {
      console.log(err);
      alert('It has not been possible to Log In!');
    });
  } else {
    alert('Complete Username and Password fields to Log In');
  }
};

const getUserData = async (usernameValue) => {
  try {
    const userData = await fetch(`/user/${usernameValue}`);
    const userDataJSON = await userData.json();

    return userDataJSON;
  } catch(err) {
    throw 'Cannot fetch user data';
  }
};