'use client';
import React from 'react';
import Navbar from '@/components/navbar';
import Dashboard from '@/components/dashboard';
import styles from './page.module.scss';
export default function UI() {
    return (
        <>
            <div className={styles.wrapper}>
                <Navbar />
                <Dashboard />
            </div>
        </>
    );
}
