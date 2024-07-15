import Layout from '@src/components/layout/layout';
import { AppRoutes } from '@src/const';
import { Link } from 'react-router-dom';
import styles from './not-found-page.module.css';

export default function NotFoundPage() {
  return (
    <Layout className={`page page--gray ${styles.root}`} showFooter>
      <section className={styles.content}>
        <h1>404. Page not found</h1>
        <Link className={styles.link} to={AppRoutes.Main}>
          Return to main page
        </Link>
      </section>
    </Layout>
  );
}
