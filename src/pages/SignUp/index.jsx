import { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import passwordComplexity from "joi-password-complexity";
import TextField from "../../components/Inputs/TextField";
import Button from "../../components/Button";
import logo from "../../images/Logo3.png";
import styles from "./styles.module.scss";

const SignUp = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		name: "",
	});
	const [errors, setErrors] = useState({});
	const [isFetching, setIsFetching] = useState(false);

	const history = useHistory();

	const handleInputState = (name, value) => {
		setData((data) => ({ ...data, [name]: value }));
	};

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors(() => ({ ...errors, [name]: value }));
	};

	const schema = {
		email: Joi.string().email({ tlds: false }).required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		name: Joi.string().min(5).max(10).required().label("Name"),
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			try {
				setIsFetching(true);
				const url = process.env.REACT_APP_API_URL + "/api/users";
				await axios.post(url, data);
				setIsFetching(false);
				toast.success("Cuenta creada exitosamente!");
				history.push("/login");
			} catch (error) {
				setIsFetching(false);
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status < 500
				) {
					toast.error(error.response.data);
				} else {
					console.log(error);
					toast.error("Algo fue mal!");
				}
			}
		} else {
			console.log("Por favor, rellene todos los campos correctamente.");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.logo_container}>
				<Link to="/">
					<img src={logo} alt="logo" />
				</Link>
			</div>
			<main className={styles.main}>
				<h1 className={styles.heading}>Registrate para comenzar a escuchar.</h1>
				<form onSubmit={handleSubmit} className={styles.form_container}>
					<div className={styles.input_container}>
						<TextField
							label="¿Cual es tu correo electronico?"
							placeholder="Ingresa tu correo electronico"
							name="email"
							handleInputState={handleInputState}
							schema={schema.email}
							handleErrorState={handleErrorState}
							value={data.email}
							error={errors.email}
							required={true}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							label="Crea una contraseña"
							placeholder="Crea una contraseña"
							name="password"
							handleInputState={handleInputState}
							schema={schema.password}
							handleErrorState={handleErrorState}
							value={data.password}
							error={errors.password}
							type="password"
							required={true}
						/>
                	</div>
					<div className={styles.input_container}>
						<TextField
							label="Cual es tu nombre de usuario?"
							placeholder="Ingresa tu nombre de usuario"
							name="name"
							handleInputState={handleInputState}
							schema={schema.name}
							handleErrorState={handleErrorState}
							value={data.name}
							error={errors.name}
							required={true}
						/>
                	</div>
					<p className={styles.terms_condition}>
						Al hacer clic en Registrarse, aceptas las condiciones de uso de Play4Sound.{" "}
						<a href="/#">Terminos y Condiciones de Uso.</a>
                	</p>
					<div className={styles.submit_btn_wrapper}>
                    	<Button label="Registrarse" type="submit" isFetching={isFetching} />
                	</div>
					<p className={styles.terms_condition} style={{ fontSize: "1.6rem" }}>
                    ¿Tienes una cuenta? <Link to="/login"> Inicia sesión.</Link>
                </p>
				</form>
			</main>
		</div>
	);
};

export default SignUp;
