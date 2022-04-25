document.addEventListener('DOMContentLoaded', (event) => {
  const loginButton = document.getElementById('login_button');
  loginButton.addEventListener('click', loginButtonPressed);
});

const loginButtonPressed = () => {
  const usernameValue = document.getElementById('username').value;
  const passwordValue = document.getElementById('password').value;
  
  if (usernameValue && passwordValue) {
    validateUserData(usernameValue, passwordValue).then((validateObj) => {
      alert(validateObj.validateResult);
    }).catch((err) => {
      alert('It has not been possible to Log In!');
    });
  } else {
    alert('Complete Username and Password fields to Log In');
  }
};

const validateUserData = async (usernameValue, passwordValue) => {
  try {
    const validateResult = await fetch(`/user/${usernameValue}&${passwordValue}`);
    const validateResultJSON = await validateResult.json();

    return validateResultJSON;
  } catch(err) {
    throw 'Cannot fetch user data';
  }
};