import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useMatch, useNavigate } from 'react-router-dom';
import styles from './profile-page.module.css';
import { logoutUserThunk } from '../../services/store/user-slice';
import { isLoggedInSelector } from '../../services/store/selectors';
import { clearCurrentOrderInfo } from '../../services/store/ui-slice';
import Modal from '../../components/modal/modal';
import OrderInfo from '../../components/order-info/order-info';

const ProfilePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isProfileActive = useMatch('/profile');
  const isOrdersStoryActive = useMatch('/profile/orders/');

  const isLoggedIn = useSelector(isLoggedInSelector);
  const isLogoutPending = useSelector((store) => store.api.isLogoutPending);
  const currentOrderInfo = useSelector((store) => store.ui.currentOrderInfo);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  const handleCloseModal = () => {
    navigate('/profile/orders', {state: null});
    dispatch(clearCurrentOrderInfo());
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

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
          {isProfileActive &&
          <p className={styles.infoText}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>}
          {isOrdersStoryActive &&
          <p className={styles.infoText}>В этом разделе вы можете просмотреть&nbsp;свою историю заказов</p>}
        </div>
        {isLogoutPending && <p className={styles.logoutMainText}>Приходите снова :)</p>}
        {!isLogoutPending && <Outlet />}
      </main>
      {currentOrderInfo &&
        (<Modal
          title={`#${currentOrderInfo.number}`}
          extraClass='pt-10 pr-10 pb-10 pl-10'
          handleCleanModalData={handleCloseModal}
          titleClass='text text_type_digits-default'
        >
          <OrderInfo orderData={currentOrderInfo} isModal />
        </Modal>)
      }
    </>
  );
};

export default ProfilePage;