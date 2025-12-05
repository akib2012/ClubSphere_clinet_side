import { toast } from "react-toastify";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const useGoogleLogin = () => {
  const { googellogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googellogin()
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful!!");
        navigate(`${location.state ? location.state : '/'}`);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google login failed");
      });
  };

  return handleGoogleLogin;
};

export default useGoogleLogin;
