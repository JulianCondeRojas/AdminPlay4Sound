import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/usersSlice/apiCalls";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
	IconButton,
	CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";

const UserTable = ({ users }) => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	setTimeout(() => setLoading(false), 1000);

	const handleUserDelete = (id) => {
		deleteUser(id, dispatch);
	};
	
	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Nº</TableCell>
						<TableCell align="center">ID</TableCell>
						<TableCell align="center">Nombre</TableCell>
						<TableCell align="center">Email</TableCell>
						<TableCell align="center">Admin</TableCell>
						<TableCell align="center">Acciones</TableCell>
					</TableRow>
				</TableHead>
				{loading && (
					<TableBody>
						<TableRow>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="center">
								<CircularProgress
									style={{ color: "#1ed760", margin: "2rem 0" }}
								/>
							</TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableBody>
				)}
				{!loading && (
					<TableBody>
						{users &&
							users.length !== 0 &&
							users.map((user) => (
								<TableRow key={user._id}>
									<TableCell align="center">
										{users.indexOf(user) + 1}
									</TableCell>
									<TableCell align="center">{user._id}</TableCell>
									<TableCell align="center">{user.name}</TableCell>
									<TableCell align="center">{user.email}</TableCell>
									<TableCell align="center">{user.isAdmin ? 'Si' : 'No'}</TableCell>
									<TableCell align="center">
										<Link to={`/users/${user._id}`}>
											<IconButton className={styles.edit_btn}>
												<EditIcon />
											</IconButton>
										</Link>
										<IconButton
											className={styles.delete_btn}
											onClick={() => handleUserDelete(user._id)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						{users && users.length === 0 && (
							<TableRow>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center">
									No hay usuarios registrados.
								</TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						)}
					</TableBody>
				)}
			</Table>
		</TableContainer>
	);
};

export default UserTable;
