import Head from 'next/head';
import styles from './quemsomos.module.css';

export default function QuemSomos()
{
    return (
        <>
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <main className={styles.container}>
                <section className={styles.section}>
                    <h2>Nossa História</h2>
                    <p>
                        Fundada no ano de 2000, nossa empresa...
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Missão da Empresa</h2>
                    <p>
                        Oferecer produtos de qualidade...
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Valores da Empresa</h2>
                    <ul className={styles.minhaLista}>
                        <li>Transparência</li>
                        <li>Foco no Cliente</li>
                        <li>Inovação</li>
                        <li>Qualidade contínua</li>
                    </ul>
                </section>
            </main>
        </div>
        </>
    )
}