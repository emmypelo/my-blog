import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../redux/slices/users/userSlices";

const useLogin = () => {
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.users.userAuth);
  const loading = useSelector((state) => state.users.loading);
  const appErr = useSelector((state) => state.users.appErr);
  const serverErr = useSelector((state) => state.users.serverErr);

  const handleLogin = async (values) => {
    dispatch(loginUserAction(values));
  };

  return {
    userAuth,
    loading,
    appErr,
    serverErr,
    handleLogin,
  };
};

export default useLogin;
