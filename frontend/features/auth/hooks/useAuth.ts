// import { useContext, useEffect } from "react";
// import { AuthContext } from "../auth.context";
// import { login, register, logout, getMe } from "../services/auth.api";


// interface LoginPayload {
//   email: string;
//   password: string;
// }

// interface RegisterPayload {
//   username: string;
//   email: string;
//   password: string;
// }

// interface User {
//   id: string;
//   email: string;
//   username: string;
// }


// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }

//   const { user, setUser, loading, setLoading } = context;


//   const handleLogin = async ({ email, password }: LoginPayload) => {
//     setLoading(true);
//     try {
//       const data = await login({ email, password });
//       setUser(data.user as User);
//     } catch (err) {
//       console.error("Login error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

 
//   const handleRegister = async ({
//     username,
//     email,
//     password,
//   }: RegisterPayload) => {
//     setLoading(true);
//     try {
//       const data = await register({ username, email, password });
//       setUser(data.user as User);
//     } catch (err) {
//       console.error("Register error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

  
//   const handleLogout = async () => {
//     setLoading(true);
//     try {
//       await logout();
//       setUser(null);
//     } catch (err) {
//       console.error("Logout error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

  
//   useEffect(() => {
//     const getAndSetUser = async () => {
//       try {
//         const data = await getMe();
//         setUser(data.user as User);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getAndSetUser();
//   }, [setUser, setLoading]);

//   return { user, loading, handleRegister, handleLogin, handleLogout };
// };


import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  
  const handleLogin = async ({ email, password }: LoginData) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      return true; // ✅ success
    } catch (err) {
      console.log("Login error:", err);
      return false; // ❌ fail
    } finally {
      setLoading(false);
    }
  };

  
  const handleRegister = async ({ username, email, password }: RegisterData) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
      return true; 
    } catch (err) {
      console.log("Register error:", err);
      return false; 
    } finally {
      setLoading(false);
    }
  };

  
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return { user, loading, handleRegister, handleLogin, handleLogout };
};