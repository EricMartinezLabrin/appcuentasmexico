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

export async function getServicesApi() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/getServices`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getKeysApi() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/get_keys`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function saleApi(
  auth,
  service_id,
  platform,
  order_id,
  amount,
  expiration_long
) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/saleApi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expiration_long: expiration_long,
        customer_email: auth.user.username,
        service_id: service_id,
        platform: platform,
        amount: amount,
        order_id: order_id,
      }),
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getServiceByNameApi(name) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/get_services_by_name_api/${name}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function registerApi(username, password, email) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/create_user_api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });
    const data = await response.json();
    return { status: response.status, data: data };
  } catch (error) {
    console.error(error);
  }
}

export async function changePassword(
  old_password,
  new_password,
  confirm_password,
  user
) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/changePasswordApi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        old_password: old_password,
        new_password: new_password,
        confirm_password: confirm_password,
        user: user,
      }),
    });
    const data = await response.json();
    console.log(data);
    return { status: response.status, data: data };
  } catch (error) {
    console.error(error);
  }
}
