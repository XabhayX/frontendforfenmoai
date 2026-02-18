import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 mt-auto border-t border-slate-800">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <div className="mb-4 md:mb-0">
                        <p>&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
