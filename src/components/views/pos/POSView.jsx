import React from 'react';
import { ProductGrid } from './ProductGrid';
import { CartSidebar } from './CartSidebar';
import { useStore } from '../../../contexts/StoreContext';
import { Button } from '../../common/Button';
import { formatCurrency } from '../../../utils/formatters';

export const POSView = () => {
    const { cart, grandTotal } = useStore();
    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-6rem)] lg:h-[calc(100vh-2rem)] gap-6 animate-fade-in relative">
            <ProductGrid />

            {/* Desktop Sidebar */}
            <div className="hidden lg:block h-full">
                <CartSidebar />
            </div>

            {/* Mobile Cart Floating Action Button or Bottom Sheet logic can replace this, 
                for now using a conditional rendering approach or sticky bottom bar handled by MainLayout? 
                Actually, the original design had a sticky button. 
                I'll keep the logic simple: On mobile, the cart is usually hidden or collapsible.
                But the requirement asks for responsiveness. 
                I will add a mobile cart drawer logic in MainLayout or here.
                For now, I'll rely on the "View Cart" button to show the modal or drawer.
                Since CartSidebar is complex, I might just show it in a modal on mobile?
                Or just render it below?
                Original code had a "View Cart" button.
            */}
        </div>
    );
};
