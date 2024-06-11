import { useEffect } from 'react';

const ClientButton = () => {
    useEffect(() => {
        const button = document.getElementById('scrollToTopBtn');
        if (button) {
            button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        }

        return () => {
            if (button) {
                button.removeEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
            }
        };
    }, []);

    return (
        <button id="scrollToTopBtn" className="p-2 rounded-full bg-core-pink hover:bg-pink-700">
            <img src="/assets/scroll-to-top-icon.svg" alt="Scroll to Top" width={24} height={24} />
        </button>
    );
};

export default ClientButton;
