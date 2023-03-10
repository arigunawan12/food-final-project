import axios from "axios";

function Logout() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}api/v1/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        window.location.reload();
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoggedIn) {
    return (
      <>
        <div onClick={handleLogout}>Log Out</div>
      </>
    );
  }
}

export default Logout;
