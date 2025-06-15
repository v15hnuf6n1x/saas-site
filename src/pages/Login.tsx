
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Zap, Eye, EyeOff, Info, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { loginSchema, signupSchema, LoginInput, SignupInput } from "@/schemas/authSchemas";
import { securityUtils } from "@/utils/securityUtils";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isAuthenticated, user } = useUser();

  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // Redirect if already authenticated
  if (isAuthenticated && user) {
    navigate(user.role === 'client' ? '/dashboard' : '/admin');
  }

  const handleLogin = async (data: LoginInput) => {
    // Check rate limiting
    const clientId = `login_${data.email}_${navigator.userAgent}`;
    if (!securityUtils.checkRateLimit(clientId, 5, 15 * 60 * 1000)) {
      securityUtils.logSecurityEvent('rate_limit_exceeded', { email: data.email });
      toast({
        title: "Too many attempts",
        description: "Please wait 15 minutes before trying again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await login(data.email, data.password);
      if (result.success && result.user) {
        securityUtils.logSecurityEvent('login_success', { email: data.email, role: result.user.role });
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        });
        navigate(result.user.role === 'client' ? '/dashboard' : '/admin');
      } else {
        setLoginAttempts(prev => prev + 1);
        securityUtils.logSecurityEvent('login_failed', { email: data.email, attempt: loginAttempts + 1 });
        toast({
          title: "Login failed",
          description: result.error || "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      securityUtils.logSecurityEvent('login_error', { email: data.email, error: String(error) });
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupInput) => {
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created!",
        description: "Welcome to Nexus. Your account has been created successfully.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Nexus</span>
          </Link>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
              <Shield className="h-5 w-5" />
              Secure Login
            </CardTitle>
            <CardDescription className="text-gray-300">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 bg-blue-500/10 border-blue-500/30">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-300 text-sm">
                <strong>Demo Credentials:</strong><br />
                Client: client@demo.com / demo<br />
                Admin: admin@nexus.com / demo<br />
                Owner: owner@nexus.com / demo
              </AlertDescription>
            </Alert>

            {loginAttempts >= 3 && (
              <Alert className="mb-6 bg-red-500/10 border-red-500/30">
                <Shield className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300 text-sm">
                  Multiple failed attempts detected. Please verify your credentials.
                </AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="login" className="text-white data-[state=active]:bg-white/20">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/20">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email"
                              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
                
                <div className="text-center">
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                    Forgot your password?
                  </a>
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={signupForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">First Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John"
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Last Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Doe"
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
            
            <Separator className="my-6 bg-white/20" />
            
            <div className="text-center text-sm text-gray-400">
              By continuing, you agree to our{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
