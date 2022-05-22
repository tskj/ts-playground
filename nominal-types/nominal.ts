const emailsymbol = Symbol('email');
type email = string & { [emailsymbol]: true };

const isEmail = (email: string): email is email => {
  return email[emailsymbol] === true;
};

const contrstructEmail = (s: string): email => {
  // validation logic
  s[emailsymbol] = true;
  return s as email;
};

const myEmail = contrstructEmail('hei@example.com');
const test = (email: email) => {
  return email.toUpperCase();
};
const x = test(myEmail);
