import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import LoadingToRedirect from './LoadingToRedirect'

const PrivateRoutes = () => {
  
  const  user  = useSelector((state) => state.user)
  // console.log(user)
  return  user && user.token ? <Outlet/> : <LoadingToRedirect />
}

export default PrivateRoutes