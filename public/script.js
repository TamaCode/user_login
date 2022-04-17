document.addEventListener('DOMContentLoaded', (event) => {
  getUsersData().then((usersData) => {
    fillRegisteredUserTable(usersData);
  }).catch((err) => {
    console.log(err);
  });
});

const getUsersData = async () => {
  try {
    const userData = await fetch('/user');
    const userDataJSON = await userData.json();

    return userDataJSON;

  } catch(err) {
    throw 'Cannot fetch users data';
  }
};

const fillRegisteredUserTable = (usersData) => {
  const colUsernameElement = document.getElementById('col_username');
  const colPasswordElement = document.getElementById('col_password');
  const colEmailElement = document.getElementById('col_email');

  usersData.forEach(({ username, password, email }) => {
    const newUsernameRow = document.createElement('p');
    newUsernameRow.innerHTML = username;
    colUsernameElement.appendChild(newUsernameRow);

    const newPasswordRow = document.createElement('p');
    newPasswordRow.innerHTML = password;
    colPasswordElement.appendChild(newPasswordRow);

    const newEmailRow = document.createElement('p');
    newEmailRow.innerHTML = email;
    colEmailElement.appendChild(newEmailRow);
  });
};