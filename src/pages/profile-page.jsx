import { NavLink, Outlet, useMatch, useNavigate } from 'react-router-dom';
import styles from './profile-page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from '../services/store/user-slice';
import { useEffect } from 'react';
import { isLoggedInSelector } from '../services/store/selectors';

const ProfilePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isProfileActive = useMatch('/profile');
  const isOrdersStoryActive = useMatch('/profile/orders/');

  const isLoggedIn = useSelector(isLoggedInSelector);
  const isLogoutPending = useSelector((store) => store.api.isLogoutPending)

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn]);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.menuBox}>
          <ul className={styles.menuLinks}>
            <li>
              <NavLink to='/profile' className={isProfileActive ? styles.menuItem : styles.menuItem_inactive}>Профиль</NavLink>
            </li>
            <li>
              <NavLink to='/profile/orders' className={isOrdersStoryActive ? styles.menuItem : styles.menuItem_inactive}>История заказов</NavLink>
            </li>
            <li>
              <button className={styles.logoutButton} onClick={handleLogout}>{isLogoutPending ? 'Выходим...' : 'Выход'}</button>
            </li>
          </ul>
          {isLogoutPending && <p className={styles.logoutText}>До свидания!</p>}
          <p className={styles.infoText}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </div>
        {isLogoutPending && <p className={styles.logoutMainText}>Приходите снова :)</p>}
        {!isLogoutPending && <Outlet />}
      </main>
    </>
  )
}

export default ProfilePage;