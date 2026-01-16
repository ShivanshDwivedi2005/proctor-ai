// import React, { createContext, useContext, useState, useCallback } from 'react';
// import { User } from '@/lib/mockData';
// import { authApi } from '@/lib/demoApi';

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
//   logout: () => void;
//   register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
// }

// interface RegisterData {
//   companyName: string;
//   industry: string;
//   companyEmail: string;
//   adminName: string;
//   adminEmail: string;
//   password: string;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(() => {
//     const stored = localStorage.getItem('safetyai_user');
//     return stored ? JSON.parse(stored) : null;
//   });

//   const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
//     const result = await authApi.login(email, password);
    
//     if (!result.success) {
//       return { success: false, error: result.error };
//     }

//     setUser(result.user);
//     localStorage.setItem('safetyai_user', JSON.stringify(result.user));
//     return { success: true };
//   }, []);

//   const logout = useCallback(async () => {
//     await authApi.logout();
//     setUser(null);
//     localStorage.removeItem('safetyai_user');
//   }, []);

//   const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
//     return await authApi.register(data);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }



// import React, { createContext, useContext, useState, useCallback } from 'react';
// import { User } from '@/lib/mockData';
// import { apiRequest } from '@/lib/api';

// /* =========================
//    Types
// ========================= */

// interface RegisterData {
//   companyName: string;
//   industry: string;
//   companyEmail: string;
//   companyRegistrationNumber: string;
//   adminName: string;
//   adminEmail: string;
//   adminContact: string;
//   password: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (
//     email: string,
//     password: string
//   ) => Promise<{ success: boolean; error?: string }>;
//   logout: () => void;
//   register: (
//     data: RegisterData
//   ) => Promise<{ success: boolean; error?: string }>;
// }

// /* =========================
//    Context
// ========================= */

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// /* =========================
//    Provider
// ========================= */

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(() => {
//     const stored = localStorage.getItem('safetyai_user');
//     return stored ? JSON.parse(stored) : null;
//   });

//   /* -------------------------
//      LOGIN (unchanged for now)
//   -------------------------- */
//   // const login = useCallback(
//   //   async (
//   //     email: string,
//   //     password: string
//   //   ): Promise<{ success: boolean; error?: string }> => {
//   //     // keeping as placeholder / mock
//   //     return { success: false, error: 'Login not implemented yet' };
//   //   },
//   //   []
//   // );

//   const login = useCallback(
//   async (email: string, password: string) => {
//     let demoUser: User;

//     if (email === 'admin@safetyai.com') {
//       demoUser = {
//         id: 'platform-admin',
//         name: 'Platform Admin',
//         email,
//         role: 'platform_admin',
//       };
//     } else {
//       demoUser = {
//         id: 'company-admin',
//         name: 'Company Admin',
//         email,
//         role: 'company_admin',
//       };
//     }

//     setUser(demoUser);
//     localStorage.setItem('safetyai_user', JSON.stringify(demoUser));

//     return { success: true };
//   },
//   []
// );


//   /* -------------------------
//      LOGOUT
//   -------------------------- */
//   const logout = useCallback(() => {
//     setUser(null);
//     localStorage.removeItem('safetyai_user');
//   }, []);

//   /* -------------------------
//      REGISTER COMPANY (REAL API)
//   -------------------------- */
//   const register = useCallback(
//     async (
//       data: RegisterData
//     ): Promise<{ success: boolean; error?: string }> => {
//       try {
//         // 🔑 FRONTEND → BACKEND FIELD MAPPING
//         const payload = {
//           company_name: data.companyName,
//           industry_type: data.industry,
//           company_email: data.companyEmail,
//           reg_no: data.companyRegistrationNumber,
//           admin_name: data.adminName,
//           admin_email: data.adminEmail,
//           contact: data.adminContact,
//           password: data.password,
//         };

//         await apiRequest('/company/register', {
//           method: 'POST',
//           body: JSON.stringify(payload),
//         });

//         return { success: true };
//       } catch (error: any) {
//         return {
//           success: false,
//           error: error.message || 'Company registration failed',
//         };
//       }
//     },
//     []
//   );

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         login,
//         logout,
//         register,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// /* =========================
//    Hook
// ========================= */

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }


import React, { createContext, useContext, useState, useCallback } from 'react';
import { apiRequest } from '@/lib/api';

/* =========================
   Types
========================= */

export interface User {
  company_name: string;
  reg_no: string;
  admin_name: string;
  admin_email: string;
  industry_type: string;
  role: 'company_admin' | 'platform_admin';
}

interface RegisterData {
  companyName: string;
  industry: string;
  companyEmail: string;
  companyRegistrationNumber: string;
  adminName: string;
  adminEmail: string;
  adminContact: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    data: RegisterData
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

/* =========================
   Context
========================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =========================
   Provider
========================= */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('safetyai_user');
    return stored ? JSON.parse(stored) : null;
  });

  /* -------------------------
     LOGIN (BACKEND API)
  -------------------------- */
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await apiRequest('/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            username: email,
            password,
          }),
        });

        const loggedInUser: User = {
          ...res.company,
          role: 'company_admin', // backend-approved company
        };

        setUser(loggedInUser);
        localStorage.setItem(
          'safetyai_user',
          JSON.stringify(loggedInUser)
        );

        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error?.message || 'Login failed',
        };
      }
    },
    []
  );

  /* -------------------------
     REGISTER COMPANY
  -------------------------- */
  const register = useCallback(
    async (data: RegisterData) => {
      try {
        const payload = {
          company_name: data.companyName,
          industry_type: data.industry,
          company_email: data.companyEmail,
          reg_no: data.companyRegistrationNumber,
          admin_name: data.adminName,
          admin_email: data.adminEmail,
          contact: data.adminContact,
          password: data.password,
        };

        await apiRequest('/company/register', {
          method: 'POST',
          body: JSON.stringify(payload),
        });

        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error?.message || 'Registration failed',
        };
      }
    },
    []
  );

  /* -------------------------
     LOGOUT
  -------------------------- */
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('safetyai_user');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =========================
   Hook
========================= */

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
