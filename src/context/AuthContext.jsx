import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const users = [
    { id: 1, email: 'admin@scholarhub.com', password: 'admin123', name: 'Admin User', role: 'admin', avatar: 'AU' },
    { id: 2, email: 'student@edu.com', password: 'student123', name: 'Alex Student', role: 'student', avatar: 'AS', gpa: 3.7, major: 'Computer Science', year: 'Junior' },
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        const found = users.find(u => u.email === email && u.password === password);
        if (found) { setUser(found); return { success: true, user: found }; }
        return { success: false, message: 'Invalid email or password' };
    };

    const register = (userData) => {
        const newUser = { id: users.length + 1, ...userData, role: 'student', avatar: userData.name.split(' ').map(n => n[0]).join('') };
        users.push(newUser);
        setUser(newUser);
        return { success: true, user: newUser };
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, isAdmin: user?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
