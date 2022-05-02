import Login from "./page/Login";
import Register from "./page/Register";
import { Routes, Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
//page
import Dashboard from "./page/Dashboard";
import PrivateRoutes from "./privateRoutes/PrivateRoutes";
import Layout from "./components/layout/Layout";
import AnalyticsList from "./page/AnalyticsList"
import AnalyticsSingle from "./page/AnalyticsSingle"
import Settings from "./page/Settings";
import Machine from "./page/Machine";
// redux
import { useDispatch } from "react-redux";
import { login } from "./redux/userSlice";
//fuction
import { currentUser } from "./function/auth";

const App = () => {

  const dispatch = useDispatch();
  
  const localToken = localStorage.token;
  useEffect(()=>{
    // const localToken = localStorage.token;
    if(localToken){
      //approve token
      const approveToken= (localToken) =>{
        currentUser(localToken).then(res=>{
          console.log(res);
          dispatch(login({
              id: res.data._id,
              token: localToken,
              username: res.data.username,
              company: res.data.company,
              role: res.data.role,
              pic: res.data.profilePic,
          }))
        }).catch(err=>{
          console.log(err);
          localStorage.clear();
        });
      }
      approveToken(localToken)
    }
  },[dispatch,localToken])

  return (
    <div>
        <ToastContainer autoClose={2000}/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Layout index={0}/>}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/machine"   element={<Layout index={1}/>}>
            <Route path="/machine" element={<Machine />} />
          </Route>
          <Route path="/analytics"   element={<Layout  index={2} />}>
            <Route path="/analytics" element={<AnalyticsList />} />
          </Route>
          <Route path="/analytics/:id" element={<Layout index={2} />}>
            <Route path="/analytics/:id" element={<AnalyticsSingle />} />
          </Route>
          <Route path="/settings"  element={<Layout index={6} />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
