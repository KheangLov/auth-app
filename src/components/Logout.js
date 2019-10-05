const Logout = () => {
  localStorage.removeItem('isLoggedIn');
  window.location = "/login";
  return false;
}

export default Logout;
