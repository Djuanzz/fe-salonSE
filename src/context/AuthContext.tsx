import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  fullname: string;
  role: string;
}

const AuthContext = createContext<{ user: User | null }>({ user: null });

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const req = await fetch("http://localhost:5000/api/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const res = await req.json();
        if (res.error) {
          throw new Error(res.error);
        }
        setUser(res.data);
      } catch (err) {
        console.error("Error getting current user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
