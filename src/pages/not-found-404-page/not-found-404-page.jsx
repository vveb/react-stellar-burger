import styles from './not-found-404-page.module.css';
import image404 from '../../images/not-found-404.gif';

const NotFound404 = () => {
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Такой странички нет :(</h2>
      <img className={styles.image} src={image404} alt='gif-ка про 404 Not Found' longdesc='https://tenor.com/ru/view/not-found-404error-crash-glitch-gif-23664505' />
      <p className={styles.text}>Попробуйте проверить правильность URL в строке браузера</p>
    </main>
  );
};

export default NotFound404;