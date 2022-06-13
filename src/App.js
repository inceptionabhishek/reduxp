import "./App.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions/userActions";

function App() {
  const tempUser = useSelector((state) => state.alluser.user);
  const dispatch = useDispatch();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const api = "https://reqres.in/api/users?page=1";
  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const getapiData = async () => {
    await fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        dispatch(setUser(data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(tempUser);
  useEffect(() => {
    getapiData();
  }, []);
  return (
    <>
      <div className="Top-Heading-Title">FAKE USERS</div>
      <div className="Divider"></div>
      <div className="Selected-User-Container">
        <div className="Selected-User">
          {loading && currUser !== null ? (
            <div className="Loading-Container">
              <div className="loader" />
            </div>
          ) : (
            <>
              {currUser === null ? (
                <div className="No-User-Selected">
                  please select from bottom
                </div>
              ) : (
                <>
                  <img
                    className="User-Image"
                    src={currUser.avatar}
                    alt="user"
                  />
                  <div className="Details">
                    <p>Details</p>
                    <p>
                      {" "}
                      First Name :<br /> {currUser.first_name}
                    </p>
                    <p>
                      Last Name :<br /> {currUser.last_name}
                    </p>
                    <p>
                      Email :<br />
                      {currUser.email}
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="Top-Heading-Title">
        {tempUser.map((user) => {
          return (
            <button
              onClick={() => {
                setLoading(true);
                fetch(`https://reqres.in/api/users/${user.id}`)
                  .then((res) => res.json())
                  .then((data) => {
                    delay(1000).then(() => {
                      setCurrUser(data.data);
                      setLoading(false);
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              className="User-Button"
            >
              {user.id}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default App;
