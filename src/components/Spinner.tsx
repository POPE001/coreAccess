import React from 'react';
import '../css/Spinner.css'; // Ensure this CSS file is created and imported
import logo from '../../public/assets/logo.svg'
import Image from 'next/image';

const Spinner = () => {
    return (
        <div className="spinner">
            <Image src={logo} alt="Loading..." className="spinner-logo" width={100} height={100} />
        </div>
    );
};

export default Spinner;
