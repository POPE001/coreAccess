// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import jwtDecode from 'jwt-decode';

// interface AuthContextType {
//   user: { id: string } | null;
//   login: (token: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<{ id: string } | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const user = getUserFromToken(token);
//       setUser(user);
//     }
//   }, []);

//   const login = (token: string) => {
//     localStorage.setItem('token', token);
//     const user = getUserFromToken(token);
//     setUser(user);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// const getUserFromToken = (token: string): { id: string } | null => {
//   try {
//     const decodedToken = jwtDecode<{ id: string }>(token);
//     return { id: decodedToken.id }; // Adjust based on your token structure
//   } catch (error) {
//     console.error('Invalid token');
//     return null;
//   }
// };

// export { AuthProvider, useAuth };
