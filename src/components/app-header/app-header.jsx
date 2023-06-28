import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.menuButtons}>
          <a className={styles.link}><BurgerIcon type='primary' /><span className={styles.text}>Конструктор</span></a>
          <a className={styles.link_inactive}><ListIcon type='secondary' /><span className={styles.text}>Лента заказов</span></a>
        </div>
        <Logo />
        <a className={styles.lk}><ProfileIcon type='secondary' /><span className={styles.text}>Личный кабинет</span></a>
      </nav>
    </header>
  )
}

export default AppHeader