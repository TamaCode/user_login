document.addEventListener('DOMContentLoaded', (event) => {
  const registerButton = document.getElementById('register_button');
  registerButton.addEventListener('click', registerButtonPressed);
});

const registerButtonPressed = () => {
  validateAndRegisterUserData().then((response) => {
    location.href = response.url;
  }).catch((err) => {
    alert(err);
  });
};

const validateAndRegisterUserData = async () => {
  const userData = {};
  userData.username = document.getElementById('username').value;
  userData.password = document.getElementById('password').value;
  userData.email = document.getElementById('email').value;

  let responseObj = {};

  const response = await fetch('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (!response.redirected) {
    responseObj = await response.json(); // Obtengo directamente el objeto enviado en la response desde el servidor
    throw responseObj.errorMessages;
  }

  return response;
};
