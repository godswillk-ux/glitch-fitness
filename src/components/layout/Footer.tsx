import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, MessageSquare, Phone, Truck, RefreshCw, ShieldAlert } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              <span className="text-xl font-black tracking-tighter uppercase italic">GLITCH</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium fitness gear for the dedicated. Elevate your workout with GLITCH.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Customer Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="https://wa.me/2347010393855" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" /> WhatsApp: +2347010393855
                </a>
              </li>
              <li>
                <Link to="/shipping" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Truck className="h-4 w-4" /> Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <RefreshCw className="h-4 w-4" /> Returns & Exchange
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Important Notice</h4>
            <div className="bg-destructive/5 border border-destructive/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-destructive font-bold text-xs mb-2">
                <ShieldAlert className="h-4 w-4" /> NO REFUNDS
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight">
                Strictly no refunds and no good or service exchange after purchase. Please review your order carefully.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GLITCH Fitness & Gear. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link to="/reviews" className="hover:text-primary transition-colors">User Reviews</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
