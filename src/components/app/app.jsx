import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import HomePage from '../../pages/home-page';
import Modal from '../modal/modal';
import { getIngredientsDataThunk } from '../../services/store/ingredients-slice';
import { clearApiError } from '../../services/store/api-state-slice';
import IngredientPage from '../../pages/ingredient-page';
import LoginPage from '../../pages/login-page';
import RegisterPage from '../../pages/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page';
import ProfilePage from '../../pages/profile-page';
import Api from '../../utils/api';
import { setUser } from '../../services/store/user-slice';

function App() {

  const dispatch = useDispatch();

  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredientsDataThunk());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      Api.getProfileInfo()
        .then((data) => {
          const { user: { name, email }, success } = data;
          if (success) {
            dispatch(setUser({ name, email }));
          }
          throw new Error({statusCode: 500, message: 'Неизвестная ошибка'});
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        })
    }
  }, [dispatch]);

  const {
    error,
    isIngredientsFailed,
  } = useSelector((store) => store.api);

  const closeErrorModal = useCallback((value) => {
    if (!value) {
      dispatch(clearApiError())
    }
  }, [dispatch])

    return (
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<HomePage />} />
          <Route path='/ingredients/:id' element={<IngredientPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='/profile' element={<ProfilePage />}>
            {/* <Route index element={<ProfileForm />} /> */}
            {/* <Route path='/profile/orders' element={<ProfileOrders />} /> */}
          </Route>
        </Routes>
        {background && (
          <Routes>
            <Route path='/ingredients/:id' element={<IngredientPage />}/>
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