import styles from './styles.module.scss';
import Link from 'next/link';

export default function Index(params) {
    return (
        <>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h1>Dashboard</h1>
                </div>
                <div className={styles.sidebarContent} style={{ overflowY: 'scroll' }}>
                    <ul className={styles.sideList}>
                        <li className={styles.sideItem}>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={styles.sideItem}>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={styles.sideItem}>
                            <Link href="/">Home</Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}
