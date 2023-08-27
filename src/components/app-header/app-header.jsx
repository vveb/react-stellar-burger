import { NavLink, useLocation, useMatch } from 'react-router-dom';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {

  const location = useLocation();
  const background = location.state && location.state.background;

  //Проверка, находимся ли мы на роуте главной страницы или деталей ингредиента
  const isConstructor = useMatch('/');
  const isIngredientDetails = useMatch('/ingredients/:id');
  //Ссылка на "Конструктор" активна, если мы на роуте главной страницы
  //или (деталей ингредиента и при этом в модальном окне, то есть background установлен)
  const isConstructorActive = isConstructor || (isIngredientDetails && background);

  const isProfileActive = useMatch('/profile/*');

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.menuButtons}>
          {/* <NavLink to='/' className={({isActive}) => isActive ? styles.link : styles.link_inactive}> */}
          <NavLink to='/' className={isConstructorActive ? styles.link : styles.link_inactive}>
            <BurgerIcon type={isConstructorActive ? 'primary' : 'secondary'} />
            <span className={styles.text}>Конструктор</span>
          </NavLink>
          <a className={styles.link_inactive} href='#'><ListIcon type='secondary' /><span className={styles.text}>Лента заказов</span></a>
        </div>
        <NavLink to={{ pathname: '/' }} className={styles.logoLink} href='#'>
          <Logo />
        </NavLink>
        <NavLink to={{ pathname: '/profile' }} className={isProfileActive ? styles.lk : styles.lk_inactive}>
          <ProfileIcon type={isProfileActive ? 'primary' : 'secondary'} />
          <span className={styles.text}>Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  )
}

export default AppHeader