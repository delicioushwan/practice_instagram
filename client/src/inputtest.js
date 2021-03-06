const regex = {
  no_korean: /^[0-9a-z]+$/,
  password: /^(?=.*[a-zA-Z])(?=.*[~`!@#$%\^&*()=+_-])(?=.*[0-9]).*$/,
  name: /^.{2,16}$/s,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

module.exports = { regex };
