import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2, Mail, Lock, User } from "lucide-react"; // Import lucide-react icons
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion"; // Import Framer Motion
import { logo1 } from "@/data"

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // Added category field
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    console.log(inputData);
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData?.message || "Signup successful.");
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "Signup Failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData?.message || "Login successful.");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login Failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  return (
    <div className=" bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <div className="flex flex-row gap-2 items-center justify-center pt-7">
        <img src={logo1} alt="shuriken" className="animate-spin w-10 h-10 rounded-full" />
        <h1 className="text-4xl text-white font-bold  ">
          WELCOME TO SHURIKEN
        </h1>
      </div>
      <motion.div
        className="flex min-h-screen items-center justify-center "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="signup">Signup</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TabsContent value="signup">
                <Card className="shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    <CardDescription>
                      Create a new account and click signup when you're done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Name</Label>
                      <div className="relative">
                        <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <Input
                          type="text"
                          name="name"
                          value={signupInput.name}
                          onChange={(e) => changeInputHandler(e, "signup")}
                          placeholder="Eg. patel"
                          required
                          className="pl-8 py-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <Input
                          type="email"
                          name="email"
                          value={signupInput.email}
                          onChange={(e) => changeInputHandler(e, "signup")}
                          placeholder="Eg. patel@gmail.com"
                          required
                          className="pl-8 py-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <Input
                          type="password"
                          name="password"
                          value={signupInput.password}
                          onChange={(e) => changeInputHandler(e, "signup")}
                          placeholder="Eg. xyz"
                          required
                          className="pl-8 py-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="role">Category</Label>
                      <select
                        name="role"
                        value={signupInput.role}
                        onChange={(e) => changeInputHandler(e, "signup")}
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                      </select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      disabled={registerIsLoading}
                      onClick={() => handleRegistration("signup")}
                      className="transition-colors duration-200 hover:bg-blue-800"
                    >
                      {registerIsLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        "Signup"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="login">
                <Card className="shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                      Login with your credentials. After signup, you'll be logged in.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <Input
                          type="email"
                          name="email"
                          value={loginInput.email}
                          onChange={(e) => changeInputHandler(e, "login")}
                          placeholder="Eg. patel@gmail.com"
                          required
                          className="pl-8 py-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <Input
                          type="password"
                          name="password"
                          value={loginInput.password}
                          onChange={(e) => changeInputHandler(e, "login")}
                          placeholder="Eg. xyz"
                          required
                          className="pl-8 py-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      disabled={loginIsLoading}
                      onClick={() => handleRegistration("login")}
                      className="transition-colors duration-200 hover:bg-blue-800"
                    >
                      {loginIsLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
