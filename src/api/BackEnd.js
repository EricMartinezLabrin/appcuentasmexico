import { BACKEND_URL } from "../assets/Const";

export async function loginApi(username, password) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/login_api/${username}/${password}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getActiveAccountByUserApi(auth) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/get_active_accounts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.stringify({
          username: auth.user.username,
          password: auth.user.password,
        }),
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function setTokenApi(token, username) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/set_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        username: username,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
