// /components/admin/Admin.js
"use client";
import { useState } from 'react';
import styles from './admin.module.css';
import Header from '@/Components/Header/page';
import AddShow from './AddShow';
// import AddMovie from './AddMovie/AddMovie';
import Footer from '@/Components/Footer/page';
import Theater from "./TheaterList/page"
import Movies from './MovieList/page'
const Admin = () => {
    const [activeTab, setActiveTab] = useState('AddMovie');

    const renderContent = () => {
        switch (activeTab) {
            case 'AddMovie':
                return <Movies />;
            case 'AddTheater':
                return <Theater/>;
            case 'AddShow':
                return <AddShow />;
            default:
                return <Movies />;
        }
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <button onClick={() => setActiveTab('AddMovie')} className={styles.sidebarButton}> Movies</button>
                    <button onClick={() => setActiveTab('AddTheater')} className={styles.sidebarButton}> Theaters</button>
                    <button onClick={() => setActiveTab('AddShow')} className={styles.sidebarButton}>Shows</button>
                </div>
                <div className={styles.content}>
                    {renderContent()}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Admin;
