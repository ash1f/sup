import axios from 'axios';
import { API_DOMAIN } from '../constants/Service'

export const RegisterUser = async (params) => {
  const p = new FormData();
  p.append('email', params.email);
  p.append('full_name', params.full_name);
  p.append('password', params.password);

  return await axios.post(API_DOMAIN + 'startup_community_api/account/register_user',
    p,
    {
      headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8;'
      },
    }).then((re) => {
      const resp = re.data;
      if (resp) {
        return re.status ? true : false;
      }
      return false;
    }).catch((err) => {
      console.warn("Error in Register user;", err);
      return false;
    });
}

export const CheckLogin = async (params) => {
  let p = new FormData()
  p.append("email", params.email);
  p.append("password", params.password);

  return await axios.post(API_DOMAIN + 'startup_community_api/account/validate_login', p, {
    headers: {
      'Content-Type': 'multipart/form-data; charset=utf-8;'
    },
  }).then((response) => {
    const re = response.data;
    if (re) {
      const isSuccess = re.status ? true : false;
      if (isSuccess) {
        const m = re.message;
        const user = re.result;
        return user;
      }
    }
    return false;
  }).catch((err) => {
    console.warn("Error in CheckLogin user", err);
    return false;
  });
}

export const ValidateEmail = async (email) => {
  let p = new FormData()
  p.append("email", email);

  return await axios.post(API_DOMAIN + 'startup_community_api/account/validate_email',
    p,
    {
      headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8;'
      },
    }).then((response) => {
      const re = response.data;
      if (re) {
        return re.status ? "Register" : re.result.is_active ? "Login" : "EmailOTP";
      }
      return false;
    }).catch((err) => {
      console.warn("Error in User ValidateEmail", err);
      return false;
    });
}

export const VeriyEmailOTP = async (email, code) => {
  if (!email && !parseInt(code)) return false
  return await axios.get(`${API_DOMAIN}startup_community_api/account/activate?email=${email}&code=${parseInt(code)}`).then((response) => {
    const re = response.data;
    if (re) return re.status;
    throw false;
  }).catch((err) => {
    console.warn("Error in User ValidateEmail", err);
    return false;
  });
}



