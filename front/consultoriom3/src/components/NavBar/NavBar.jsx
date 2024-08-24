import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import UserMenu from '../userMenu/UserMenu';


const Navbar = () => {
  return (

    <div>
      <h1 className={styles.titulo}>Sante</h1>
      <nav className={styles.navbar}>
        <div className={styles.navList}>
          <li className={styles.navItem}><Link to="/Home">Home</Link></li>
          <li className={styles.navItem}><Link to="/SobreNosotros">Sobre Nosotros</Link></li>
          <li className={styles.navItem}><Link to="/MisTurnos">Mis Turnos</Link></li>
          <li className={styles.navItem}><Link to="/Contacto">Contacto</Link></li>

        </div>
      </nav>
      <UserMenu />
    </div>
  );
}

export default Navbar;