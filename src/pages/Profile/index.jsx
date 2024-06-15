import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/userSlice/apiCalls";
import Joi from "joi";
import TextField from "../../components/Inputs/TextField";
import Button from "../../components/Button";
import styles from "./styles.module.scss";

const Profile = () => {
	const [data, setData] = useState({
		name: "",
	});
	const [errors, setErrors] = useState({});
	const { user, updateUserProgress } = useSelector((state) => state.user);
	const dispatch = useDispatch();
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
		name: Joi.string().min(5).max(10).required().label("Name"),
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = { data, id: user._id };
		const res = await updateUser(payload, dispatch);
		res && history.push("/home");
	};

	useEffect(() => {
		if (user) {
			const dk = {
				name: user.name,
			};
			setData(dk);
		}
	}, [user]);

	return (
		<div className={styles.container}>
			<h1>Perfil</h1>
			<form onSubmit={handleSubmit} className={styles.form_container}>
				<div className={styles.input_container}>
					<TextField
						label="¿Cual es tu correo electronico?"
						placeholder="Introzca su correo electronico"
						value={user ? user.email : ""}
						required={true}
						disabled={true}
						style={{ color: "white" }}
					/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="¿Cual es tu nombre de perfil?"
						placeholder="Introzca su nombre de perfil"
						name="name"
						handleInputState={handleInputState}
						schema={schema.name}
						handleErrorState={handleErrorState}
						value={data.name}
						error={errors.name}
						required={true}
					/>
				</div>
				<div className={styles.submit_btn_wrapper}>
					<Button
						label="Actualizar"
						type="Enviar"
						isFetching={updateUserProgress}
					/>
				</div>
			</form>
		</div>
	);
};

export default Profile;
