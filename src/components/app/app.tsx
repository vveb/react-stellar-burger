import { useEffect, useCallback } from 'react';
import { batch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import HomePage from '../../pages/home-page/home-page';
import Modal from '../modal/modal';
import { getIngredientsDataThunk } from '../../services/store/ingredients-slice';
import { clearApiError, setIsGetProfileInfoFailed, setIsGetProfileInfoPending, setIsGetProfileInfoSucceed } from '../../services/store/api-state-slice';
import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import LoginPage from '../../pages/authorization-pages/login-page';
import RegisterPage from '../../pages/authorization-pages/register-page';
import ForgotPasswordPage from '../../pages/authorization-pages/forgot-password-page';
import ResetPasswordPage from '../../pages/authorization-pages/reset-password-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import Api from '../../utils/api';
import { setAuthChecked, setUser } from '../../services/store/user-slice';
import ProfileForm from '../profile-form/profile-form';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import NotFound404 from '../../pages/not-found-404-page/not-found-404-page';
import FeedPage from '../../pages/feed-page/feed-page';
import FeedView from '../feed-view/feed-view';
import OrderPage from '../../pages/order-page/order-page';
import { useDispatch, useSelector } from '../../services/store/store';

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const background: boolean = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredientsDataThunk());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(setIsGetProfileInfoPending());
      Api.getProfileInfo()
        .then((data) => {
          const { user: { name, email }, success } = data;
          if (success) {
            //batch - выполняет все dispatch без множественного ре-рендеринга
            //React v18 использует это по умолчанию
            batch(() => {
              dispatch(setUser({ name, email }));
              dispatch(setIsGetProfileInfoSucceed());
            });
          } else {
            throw new Error('Неизвестная ошибка');
          };
        })
        .catch((err) => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          batch(() => {
            dispatch(setIsGetProfileInfoFailed(err));
            dispatch(setUser({ name: '', email: '' }));
          });
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }, [dispatch]);

  const {
    error,
    isIngredientsFailed,
  } = useSelector((store) => store.api);

  const closeErrorModal = useCallback((value) => {
    if (!value) {
      dispatch(clearApiError())
    };
  }, [dispatch]);

    return (
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<HomePage />} />
          <Route path='/ingredients/:id' element={<IngredientPage />} />
          <Route path='/feed' element={<FeedPage />} />
          <Route path='/feed/:number' element={<OrderPage />} />
          <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
          <Route path='/register' element={<OnlyUnAuth component={<RegisterPage />} />} />
          <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
          <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
          <Route path='/profile' element={<OnlyAuth component={<ProfilePage />} />}>
            <Route index element={<ProfileForm />} />
            <Route path='/profile/orders' element={<FeedView />} />
          </Route>
          <Route path='/profile/orders/:number' element={<OrderPage />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        {background && (
          <Routes>
            <Route path='/ingredients/:id' element={<IngredientPage />} />
            <Route path='/feed/:number' element={<OrderPage />} />
            <Route path='/profile/orders/:number' element={<OrderPage />} />
          </Routes>
        )}
        {(error && !isIngredientsFailed) && 
        <Modal title='Что-то пошло не так :(' handleCleanModalData={closeErrorModal} extraClass='pt-10 pr-10 pb-15 pl-10'>
          <p className={styles.modalErrorText}>{error}</p>
        </Modal>
        }
      </div>
    );
}

export default App;