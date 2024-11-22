const isClient = typeof document !== 'undefined';

const getCookie = (cookieName:string) => {
  if (!isClient) return '';
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieName}=`));
  return cookie ? cookie.split('=')[1] : '';
};

const setCookie = (cookieName:string, value:string, expirationDate:string) => {
  if (!isClient) return;
   const expireDate = expirationDate ? new Date(expirationDate).toUTCString() : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();

// console.log(`Setting cookie: ${cookieName}=${value}; expires=${expireDate}; path=/;`);

document.cookie = `${cookieName}=${value}; expires=${expireDate}; path=/; domain=${window.location.hostname}; SameSite=Lax`;

// Double-check the result immediately
// console.log(`Cookie after set: ${document.cookie}`);
};

const deleteCookie = (cookieName:string) => {
  if (!isClient) return;
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};



export { getCookie, setCookie, deleteCookie };