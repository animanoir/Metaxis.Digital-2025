import styles from './Footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerLinks}>
          <span className={styles.svgIcon}>
            <a target="_blank" rel="noreferrer" href="https://t.me/+u0btF1H3XaZkNGIx">
              <Image
                width={24}
                height={24}
                src="/telegram.svg"
                alt="Únete a nuestro canal de Telegram." />
            </a>
          </span>
          <span className={styles.svgIcon}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/@metaxisdigital/videos"
            >
              <Image
                width={24}
                height={24}
                src="/youtube.svg" alt="Suscríbete a nuestro canal en YouTube." />
            </a>
          </span>
        </div>
        <div className={styles.ccommons}>
          <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            <img
              alt="Creative Commons License"
              style={{ borderWidth: 0, marginRight: '10px' }}
              src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
            />
          </a>
          <div className={styles.fantasmacontainer}>
            <p>
              Un proyecto de{' '}
              <a className={styles.fantasma} href="https://fantasma.rip/">
                <b>fantasma</b>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
