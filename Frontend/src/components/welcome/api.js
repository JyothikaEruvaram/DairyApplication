async function login(email, password) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    return fetch("/users/login", requestOptions).then((response) => response.json());
  }
  
  export default login;
  