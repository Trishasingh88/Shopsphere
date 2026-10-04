import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ShoppingBag, User, LogOut, LayoutDashboard, Menu, X } from 'lucide-react'
import { useCart, useAuth } from '../context'
import { useState } from 'react'

export default function Layout(){
 const {count}=useCart(); const {user,logout}=useAuth(); const nav=useNavigate(); const [open,setOpen]=useState(false)
 const links=[['/','Shop'],['/orders','Orders']];
 return <div className="min-h-screen bg-slate-50">
  <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
   <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
    <Link to="/" className="text-2xl font-black tracking-tight">Shop<span className="gradient-text">Sphere</span></Link>
    <nav className="hidden items-center gap-7 md:flex">{links.map(([to,label])=><NavLink key={to} to={to} className={({isActive})=>isActive?'font-semibold text-indigo-600':'font-medium text-slate-600 hover:text-indigo-600'}>{label}</NavLink>)}</nav>
    <div className="flex items-center gap-2">
      {user?.role==='admin' && <Link to="/admin" className="hidden rounded-xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 sm:flex"><LayoutDashboard size={16} className="mr-2"/>Admin</Link>}
      <Link to="/cart" className="relative rounded-xl p-2 hover:bg-slate-100"><ShoppingBag size={21}/>{count>0&&<span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-indigo-600 px-1 text-[11px] font-bold text-white">{count}</span>}</Link>
      {user ? <button onClick={()=>{logout();nav('/')}} className="rounded-xl p-2 hover:bg-slate-100" title="Logout"><LogOut size={20}/></button> : <Link to="/login" className="rounded-xl p-2 hover:bg-slate-100"><User size={20}/></Link>}
      <button className="rounded-xl p-2 md:hidden" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </div>
   </div>
   {open&&<div className="border-t border-slate-100 px-4 py-4 md:hidden">{links.map(([to,label])=><Link onClick={()=>setOpen(false)} key={to} to={to} className="block py-2 font-medium">{label}</Link>)}{user?.role==='admin'&&<Link onClick={()=>setOpen(false)} to="/admin" className="block py-2 font-medium">Admin Dashboard</Link>}</div>}
  </header>
  <main><Outlet/></main>
  <footer className="mt-20 border-t bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} ShopSphere</span><span>React · Tailwind · Express · SQLite · JWT</span></div></footer>
 </div>
}
