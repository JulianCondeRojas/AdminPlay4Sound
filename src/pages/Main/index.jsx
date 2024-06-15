import { Link } from "react-router-dom";
import Button from "../../components/Button";
import CopyrightIcon from "@mui/icons-material/Copyright";
import logo from "../../images/Logo2.png";
import styles from "./styles.module.scss";

const navLinks = [
	{ name: "Soporte", link: "/help" },
	{ name: "Registrate", link: "/signup" },
	{ name: "Inicia sesión", link: "/login" },
];


const Main = () => {
	return (
		<div className={styles.container}>
			<nav className={styles.navbar_container}>
				<Link to="/" className={styles.nav_logo}>
					<img src={logo} alt="logo" />
				</Link>
				<div className={styles.nav_links}>
					{navLinks.map((link, index) => (
						<Link key={index} to={link.link} className={styles.links}>
							{link.name}
						</Link>
					))}
				</div>
			</nav>
			<main className={styles.main_container}>
				<div className={styles.main}>
					<h1>¡Bienvenido a Play4Sound!</h1>
					<p>Descubre un mundo de sonidos ilimitados en <b>Play4Sound</b>. Sumérgete en una experiencia auditiva sin
        			fronteras, donde cada nota y cada palabra se entrelazan para crear momentos inolvidables.</p>
					<Link to="/signup">
						<Button
							label="COMIENZA AQUÍ"
							style={{ color: "#ffffff", width: "18rem", fontSize: "1.4rem", backgroundColor: "#E07400"}}
						/>
					</Link>
				</div>
			</main>
			<footer className={styles.footer_container}>
				<div className={styles.footer_2}>
					<div className={styles.copy_right}>
						<CopyrightIcon />
						<span>2024 Play4Sound</span>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Main;
