import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";

const NotFound = () => {
	const history = useHistory();

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.main}>
					<h1>Error</h1>
					<p>
					No hemos podido encontrar la página que buscaba. ¿Quizás podemos ayudarte?
					</p>
					<span onClick={() => history.push("/home")}>Vuelve al inicio</span>
				</div>
			</div>
			<div className={styles.right}>
				<img src="./images/record.svg" alt="record" className={styles.record} />
				<img
					src="./images/record-arm.svg"
					alt="record-arm"
					className={styles.record_arm}
				/>
			</div>
		</div>
	);
};

export default NotFound;
