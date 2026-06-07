import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const DEMO_USER = { name: 'Rahul Kumar', email: 'demo@FinGuard.ai', initials: 'RK' }

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fg_user')
      if (stored) {
        const user = JSON.parse(stored)
        setCurrentUser(user)
        setIsAuthenticated(true)
      }
    } catch {}
  }, [])

  function login(email, password) {
    // Demo: accept demo creds or any non-empty signup
    if (!email || !password) return { error: 'Please fill all fields.' }
    const stored = localStorage.getItem('fg_signup_' + email)
    if (stored) {
      const user = JSON.parse(stored)
      if (user.password !== password) return { error: 'Incorrect password.' }
      const u = { name: user.name, email: user.email, initials: user.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() }
      setCurrentUser(u); setIsAuthenticated(true)
      localStorage.setItem('fg_user', JSON.stringify(u))
      return { success: true }
    }
    // Demo credentials
    if (email === 'demo@FinGuard.ai' && password === 'Finguard123') {
      setCurrentUser(DEMO_USER); setIsAuthenticated(true)
      localStorage.setItem('fg_user', JSON.stringify(DEMO_USER))
      return { success: true }
    }
    return { error: 'No account found. Please sign up.' }
  }

  function signup(name, email, password) {
    if (!name || !email || !password) return { error: 'Please fill all fields.' }
    if (password.length < 6) return { error: 'Password must be at least 6 characters.' }
    localStorage.setItem('fg_signup_' + email, JSON.stringify({ name, email, password }))
    const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
    const u = { name, email, initials }
    setCurrentUser(u); setIsAuthenticated(true)
    localStorage.setItem('fg_user', JSON.stringify(u))
    return { success: true }
  }

  function logout() {
    setCurrentUser(null); setIsAuthenticated(false)
    localStorage.removeItem('fg_user')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}