import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from './api'

const CartContext = createContext(null)
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('shopsphere_cart') || '[]'))
  useEffect(() => localStorage.setItem('shopsphere_cart', JSON.stringify(cart)), [cart])
  const add = (product) => setCart(prev => {
    const found = prev.find(i => i.productId === product.id)
    if (found) return prev.map(i => i.productId === product.id ? { ...i, quantity: Math.min(i.quantity + 1, product.stock) } : i)
    return [...prev, { productId: product.id, name: product.name, price: product.price, image: product.image, quantity: 1, stock: product.stock }]
  })
  const update = (id, quantity) => setCart(prev => prev.map(i => i.productId === id ? { ...i, quantity: Math.max(1, Math.min(Number(quantity), i.stock)) } : i))
  const remove = id => setCart(prev => prev.filter(i => i.productId !== id))
  const clear = () => setCart([])
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const value = useMemo(() => ({ cart, add, update, remove, clear, total, count: cart.reduce((s,i)=>s+i.quantity,0) }), [cart,total])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export const useCart = () => useContext(CartContext)

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('shopsphere_user') || 'null'))
  const [loading, setLoading] = useState(false)
  const login = async (email, password) => { setLoading(true); try { const { data } = await api.post('/auth/login',{email,password}); localStorage.setItem('shopsphere_token',data.token); localStorage.setItem('shopsphere_user',JSON.stringify(data.user)); setUser(data.user); return data } finally { setLoading(false) } }
  const register = async (payload) => { setLoading(true); try { const { data } = await api.post('/auth/register',payload); localStorage.setItem('shopsphere_token',data.token); localStorage.setItem('shopsphere_user',JSON.stringify(data.user)); setUser(data.user); return data } finally { setLoading(false) } }
  const logout = () => { localStorage.removeItem('shopsphere_token'); localStorage.removeItem('shopsphere_user'); setUser(null) }
  return <AuthContext.Provider value={{user,login,register,logout,loading}}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
