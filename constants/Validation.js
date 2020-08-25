
const pwdRegex = [
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
]

export const isExisty = function (value) {
  return value !== null && value !== undefined;
};

export const isEmpty = function (value) {
  if (value instanceof Array) {
    return value.length === 0;
  }
  return value === '' || !isExisty(value);
};

export const isEmptyTrimed = function (value) {
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  return true;
};

export const matchRegexp = (value, regexp) => {
  const validationRegexp = (regexp instanceof RegExp ? regexp : (new RegExp(regexp)));
  return validationRegexp.test(value);
}

export const isEmail = value => matchRegexp(value, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i)

export const trim = value => !isEmptyTrimed(value)

export const isNumber = value => matchRegexp(value, /^-?[0-9]\d*(\d+)?$/i)

export const isFloat = value => matchRegexp(value, /^(?:-?[1-9]\d*|-?0)?(?:\.\d+)?$/i)

export const isPositive = (value) => {
  if (isExisty(value)) {
    return (isNumber(value) || isFloat(value)) && value >= 0;
  }
  return true;
}

export const maxNumber = (value, max) => isEmpty(value) || parseInt(value, 10) <= parseInt(max, 10)

export const minNumber = (value, min) => isEmpty(value) || parseInt(value, 10) >= parseInt(min, 10)

export const maxFloat = (value, max) => isEmpty(value) || parseFloat(value) <= parseFloat(max)

export const minFloat = (value, min) => isEmpty(value) || parseFloat(value) >= parseFloat(min)

export const isString = value => !isEmpty(value) || typeof value === 'string' || value instanceof String

export const minStringLength = (value, length) => isString(value) && value.length >= length

export const maxStringLength = (value, length) => isString(value) && value.length <= length

export const pwdValidate = (pwd = "") => {
  let lvl = 0;
  if(pwd){
    if (matchRegexp(pwd, pwdRegex[0]))
      lvl = 1

    if(matchRegexp(pwd, pwdRegex[1]))
      lvl = 2

    if(matchRegexp(pwd, pwdRegex[2]))
      lvl = 3      
  }
  return lvl
}