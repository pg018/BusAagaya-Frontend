import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAppDispatch } from "./stateStore";
import { useEffect } from "react";
import { appServices } from "./reducers/App/AppSlice";
import Home from "./pages/Home/Home";
import BusResults from "./pages/BusResults/BusResults";
import AddBus from "./pages/AddBus/AddBus";
import BusProviderBuses from "./pages/BusProviderBuses/BusProviderBuses";
import MyBookings from "./pages/MyBookings/MyBookings";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appServices.getmeThunk());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/busresults" element={<BusResults />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addbus" element={<AddBus />} />
          <Route path="/mybuses" element={<BusProviderBuses />} />
          <Route path="/mybookings" element={<MyBookings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
