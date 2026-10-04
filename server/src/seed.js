import 'dotenv/config'; import bcrypt from 'bcryptjs'; import db from './db.js'
const adminHash=bcrypt.hashSync('Admin@123',10), userHash=bcrypt.hashSync('Demo@123',10)
db.prepare('INSERT OR IGNORE INTO users(name,email,password,role) VALUES(?,?,?,?)').run('ShopSphere Admin','admin@shopsphere.dev',adminHash,'admin')
db.prepare('INSERT OR IGNORE INTO users(name,email,password,role) VALUES(?,?,?,?)').run('Demo Customer','demo@shopsphere.dev',userHash,'customer')
const products=[
['Aura Headphones','Electronics','Wireless noise-cancelling headphones with rich bass and a comfortable fit.',7999,24,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'],
['Minimal Watch','Accessories','A clean everyday watch with a premium metal case and leather strap.',5499,18,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'],
['Everyday Sneakers','Fashion','Lightweight sneakers designed for all-day comfort and city walks.',4299,32,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'],
['Urban Backpack','Lifestyle','Water-resistant backpack with laptop sleeve and smart organization.',2999,21,'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80'],
['Desk Lamp Pro','Home','Adjustable LED desk lamp with warm/cool modes for focused work.',1899,40,'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80'],
['Smart Bottle','Lifestyle','Temperature-aware stainless steel bottle for work, gym and travel.',1599,45,'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80'],
['Mechanical Keyboard','Electronics','Compact mechanical keyboard with tactile switches and RGB backlight.',6499,16,'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80'],
['Canvas Tote','Fashion','Durable minimalist tote bag for daily essentials and weekend errands.',999,55,'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80']
]
const insert=db.prepare('INSERT INTO products(name,category,description,price,stock,image) VALUES(?,?,?,?,?,?)');const tx=db.transaction(()=>{if(db.prepare('SELECT COUNT(*) n FROM products').get().n===0)for(const p of products)insert.run(...p)});tx();console.log('Seed complete. Admin: admin@shopsphere.dev / Admin@123')
