import { authService } from "src/services";
import { z } from "zod";
import {
  LoginFormSchema,
  RegisterFormSchema,
} from "src/types/form-schemas";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useLoading from "./useLoading";
import { setAuthorizationToken } from "src/lib/utils";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logoutUser, setUser } from "@/features/user/userSlice";

const useAuth = () => {
  const navigate = useNavigate();
  const { loading, withLoading } = useLoading();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const registerUser = async (
    data: Omit<z.infer<typeof RegisterFormSchema>, "confirmPassword">,
  ) => {
    console.log(data);
    withLoading(async () => {
      const response = await authService.registerStudent(data);
      if (response.status === 201) {
        navigate("/auth/sign-in");
        toast.success(
          "You have been successfully registered!! Redirecting you to login",
        );
      }
    });
  };

  const loginUser = async (data: z.infer<typeof LoginFormSchema>) => {
    withLoading(async () => {
      const response = await authService.loginStudent(data);

      const {
        token,
        data: userDetails
      } = response.data as {message: string, token: string, data: {id: number, firstName: string, lastName: string, email: string}};

      if (response.status == 200) {
        setAuthorizationToken(token, "ACCESS");
        dispatch(setUser({
          id: userDetails.id,
          email: userDetails.email,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
        }));
        navigate(location.state?.path || "/admin", { replace: true });
        toast.success("Logged in successfully!!");
      }
    });
  };

  const logoutMUser = () => {
    withLoading(async () => {
      Cookies.remove("currentUser");
      dispatch(logoutUser(user));
      toast.success("logged out successfully!");
      navigate("/auth/sign-in");
    });
  };

  return { registerUser, loginUser, logoutMUser, loading };
};

export default useAuth;
