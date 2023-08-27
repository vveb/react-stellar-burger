import { NavLink, Outlet, useMatch, useNavigate } from 'react-router-dom';
import styles from './profile-page.module.css';
import { useDispatch } from 'react-redux';
import { logoutUserThunk } from '../services/store/user-slice';

const ProfilePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isProfileActive = useMatch('/profile');
  const isOrdersStoryActive = useMatch('/profile/orders/');

  const handleLogout = () => {
    dispatch(logoutUserThunk());
    navigate('/');
  }

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
              <button className={styles.logoutButton} onClick={handleLogout}>Выход</button>
            </li>
          </ul>
          <p className={styles.infoText}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </div>
        <Outlet />
      </main>
    </>
  )
}

export default ProfilePage;