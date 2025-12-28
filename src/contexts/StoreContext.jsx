import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const StoreContext = createContext();

// ... (INITIAL_PRODUCTS and INITIAL_SETTINGS remain unchanged) 

const INITIAL_PRODUCTS = [
    { id: 1, name: "Super Basmati Rice", price: 350, category: "Grains", stock: 100, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Cooking Oil (1L)", price: 550, category: "Essentials", stock: 50, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Tapal Danedar Tea", price: 120, category: "Beverages", stock: 200, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "National Pickle", price: 280, category: "Condiments", stock: 40, image: "https://images.unsplash.com/photo-1517093758-c92df3e21e06?auto=format&fit=crop&w=400&q=80" },
    { id: 5, name: "Milk Pak (1L)", price: 260, category: "Dairy", stock: 60, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: "Shan Biryani Masala", price: 100, category: "Spices", stock: 150, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80" },
    { id: 7, name: "Lux Soap", price: 140, category: "Personal Care", stock: 80, image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=400&q=80" },
    { id: 8, name: "Coke (1.5L)", price: 160, category: "Beverages", stock: 40, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80" },
];

const INITIAL_SETTINGS = {
    storeName: "Bismillah General Store",
    address: "Shop #4, Main Market, G-11 Markaz, Islamabad",
    phone: "0300-1234567",
    ntn: "1234567-8",
    footerMessage: "Thank you for shopping with us! No return without receipt.",
    taxRate: 0,
    adminPin: "1234"
};

export const StoreProvider = ({ children }) => {
    const toast = useToast();
    // ... State (unchanged)
    // Helper for safe localStorage parsing
    const safeJSONParse = (key, fallback) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : fallback;
        } catch (error) {
            console.error(`Error parsing ${key} from localStorage:`, error);
            return fallback;
        }
    };

    const [products, setProducts] = useState(() => safeJSONParse('pos_products', INITIAL_PRODUCTS));

    const [cart, setCart] = useState(() => []); // Cart should start empty on reload usually, or persist? Valid to persist.
    // Actually previous code was: const [cart, setCart] = useState([]); => it wasn't persisting cart? 
    // Wait, line 37 in viewed file says: const [cart, setCart] = useState([]); 
    // Line 110: useEffect(() => localStorage.setItem('pos_products'... 
    // Cart implies persistence only if added. Previous code did NOT persist cart! 
    // I will leave cart as empty array for now or persist it if requested, but to be safe I'll leave it as is.
    // Wait, I should check if I missed cart persistence lines.

    // Resume Safe Parse replacement:
    const [sales, setSales] = useState(() => safeJSONParse('pos_sales', []));

    const [settings, setSettings] = useState(() => {
        const saved = safeJSONParse('pos_settings', null);
        return saved ? { ...INITIAL_SETTINGS, ...saved } : INITIAL_SETTINGS;
    });

    const [users, setUsers] = useState(() => {
        const saved = safeJSONParse('pos_users', null);
        if (saved) return saved;
        return [{ id: 1, name: "Admin", pin: INITIAL_SETTINGS.adminPin || "1234", role: "admin" }];
    });

    const [currentUser, setCurrentUser] = useState(null);

    const login = (pin) => {
        const user = users.find(u => u.pin === pin);
        if (user) {
            setCurrentUser(user);
            toast.success(`Welcome, ${user.name}`);
            return true;
        }
        toast.error("Invalid PIN");
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
        toast.info("Logged Out");
    };

    const addUser = (user) => {
        setUsers(prev => [...prev, { ...user, id: Date.now() }]);
        toast.success("User added successfully");
    };

    const updateUser = (updatedUser) => {
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
        toast.success("User updated");
    };

    const deleteUser = (id) => {
        if (users.length <= 1) {
            toast.error("Cannot delete the last user");
            return;
        }
        setUsers(prev => prev.filter(u => u.id !== id));
        toast.success("User deleted");
    };

    // ... Effects and Derived State (unchanged)
    useEffect(() => localStorage.setItem('pos_products', JSON.stringify(products)), [products]);
    useEffect(() => localStorage.setItem('pos_sales', JSON.stringify(sales)), [sales]);
    useEffect(() => localStorage.setItem('pos_settings', JSON.stringify(settings)), [settings]);
    useEffect(() => localStorage.setItem('pos_users', JSON.stringify(users)), [users]);

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const taxAmount = (cartTotal * settings.taxRate) / 100;
    const grandTotal = cartTotal + taxAmount;

    // Actions
    const addToCart = (product) => {
        if (product.stock <= 0) {
            toast.error("Out of stock!");
            return;
        }

        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                if (existing.qty >= product.stock) {
                    toast.error("Cannot add more than available stock!");
                    return prev;
                }
                toast.success(`Updated ${product.name} quantity`);
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            toast.success(`Added ${product.name} to cart`);
            return [...prev, { ...product, qty: 1 }];
        });
    };


    const updateQty = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const product = products.find(p => p.id === id);
                if (!product) return item; // Safety check
                const newQty = Math.max(1, Math.min(product.stock, item.qty + delta));
                return { ...item, qty: newQty };
            }
            return item;
        }));
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => setCart([]);

    const completeSale = (paymentMethod = "Cash") => {
        const newSale = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: [...cart],
            subtotal: cartTotal,
            tax: taxAmount,
            total: grandTotal,
            paymentMethod
        };

        // Update stock
        const newProducts = products.map(p => {
            const cartItem = cart.find(c => c.id === p.id);
            if (cartItem) {
                return { ...p, stock: p.stock - cartItem.qty };
            }
            return p;
        });

        setProducts(newProducts);
        setSales([newSale, ...sales]);
        setCart([]);

        return newSale;
    };

    const addProduct = (product) => {
        setProducts(prev => [...prev, { ...product, id: Date.now() }]);
    };

    const updateProduct = (product) => {
        setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const updateSettings = (newSettings) => {
        setSettings(newSettings);
    };

    return (
        <StoreContext.Provider value={{
            products,
            cart,
            sales,
            settings,
            cartTotal,
            taxAmount,
            grandTotal,
            addToCart,
            updateQty,
            removeFromCart,
            clearCart,
            completeSale,
            addProduct,
            updateProduct,
            deleteProduct,
            updateSettings,
            currentUser,
            users,
            login,
            logout,
            addUser,
            updateUser,
            deleteUser
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
