import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components/index";
import authService from "./appwrite/auth";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
          //so that if there is no current user the state will remian up to date by saying that you are logged out
        }
      })
      .catch((error) => {
        dispatch(logout());
        console.log("Get Current User Error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          {/* <div className="flex justify-center items-center w-full h-screen bg-black">
            <h1 className="text-white text-center font-extrabold text-5xl">
              Not Loading
            </h1>
          </div> */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center w-full h-screen bg-black">
      <h1 className="text-white text-center font-extrabold text-5xl">
        Loading ...
      </h1>
    </div>
  );
}

export default App;

{
  /* <div className="flex justify-center items-center w-full h-screen bg-black">
<h1 className="text-white text-center font-extrabold text-5xl">
  Hi Testing
</h1>
</div> */
}
