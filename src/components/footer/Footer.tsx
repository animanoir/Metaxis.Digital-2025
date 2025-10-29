import styles from './Footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerLinks}>
          <span className={styles.svgIcon}>
            <a target="_blank" rel="noreferrer" href="https://t.me/+DULTIj9jMLgzNTUx">
              <Image
                width={18}
                height={18}
                src="/telegram.svg"
                alt="Join our Telegram channel." />
            </a>
          </span>
          <span className={styles.svgIcon}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/@metaxisdigital/videos"
            >
              <Image
                width={18}
                height={18}
                src="/youtube.svg"
                alt="Subscribe to metaxis.digital YouTube channel." />
            </a>
          </span>
          <span className={styles.svgIcon}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://discord.gg/cSfuHzG8BT"
            >
              <Image
                width={18}
                height={18}
                src="/discord.svg"
                alt="Enter metaxis.digital. Discord channel."
              />
            </a>
          </span>
          <span className={styles.svgIcon}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/metaxisdigital/"
            >
              <Image
                width={18}
                height={18}
                src="/instagram.svg"
                alt="Follow metaxis.digital on Instagram."
              />
            </a>
          </span>
          <span className={styles.svgIcon}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://x.com/metaxis_digital"
            >
              <Image
                width={18}
                height={18}
                src="/x-twitter.svg"
                alt="Follow metaxis.digital on X/Twitter."
              />
            </a>
          </span>
        </div>
        <div className={styles.ccommons}>
          <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            <Image
              alt="Creative Commons License"
              width={88}
              height={31}
              style={{ borderWidth: 0, marginRight: '10px' }}
              src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
            />
          </a>
          <div className={`${styles.fantasmacontainer} text-gray-800`} >
            <p>
              A project by{' '}
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