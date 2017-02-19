
import { browserHistory } from '../routes';

export async function login(username, password) {
  const { token } = await Promise.resolve(
    $.get(`/user/login?username=${username}&password=${password}`)
  );
  Cookies.set('token', token);
  browserHistory.push('/list');
}

export async function register(username, password) {
  const { token } = await Promise.resolve(
    $.post(`/user/register`, {
      username,
      password
    })
  );
  Cookies.set('token', token);
  browserHistory.push('/list');
}


