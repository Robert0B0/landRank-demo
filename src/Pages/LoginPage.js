import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
	makeStyles,
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Fab,
	Fade,
	Backdrop,
	Box,
	Typography,
	Container,
	Modal,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ENDPOINTS, createAPIEndpoint } from "../api/index";
import { AuthContext } from "../context/auth";
import Notification from "../Components/Notification";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				LandRank
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	containerModal: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		width: "30rem",
		height: "16rem",
	},
}));

export default function LoginPage() {
	const [openModal, setOpenModal] = useState(true);
	const classes = useStyles();
	const history = useHistory();
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({
		userName: "",
		password: "",
	});
	const [notify, setNotify] = useState({ isOpen: false });
	const [user, setUser] = useState({
		userName: "Lucian_T",
		password: "123456",
	});

	const validateLogin = () => {
		let temp = {};
		temp.userName = user.userName !== "" ? "" : "User Name Required";
		temp.password = user.password !== "" ? "" : "Password Required";
		setErrors({ ...temp });
		return Object.values(temp).every((x) => x === "");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateLogin()) {
			createAPIEndpoint(ENDPOINTS.LOGIN)
				.login(user)
				.then((res) => {
					let auth = {
						headers: {
							Authorization: "Bearer " + res.data.token,
						},
					};
					let token = res.data.token;
					createAPIEndpoint(ENDPOINTS.AUTH)
						.auth(auth)
						.then((res) => {
							context.login(res.data, token);
							setNotify({
								isOpen: true,
								message: "Welcome",
							});
							history.push("/");
							//console.log(res);
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					setNotify({
						isOpen: true,
						message: "Username or password is incorrect. ",
					});
					console.log(err);
				});
		} else {
			console.log("not a valid login");
		}
	};

	const handleLogin = () => {
		const demoData = {
			address: "Calea Eroilor 10, Mun. Ovidiu, Arad, CP 335401",
			companyName: "LandRank",
			email: "luc",
			fullName: "Lucian Teneriu",
			id: "ae5cbff6-90f1-4c6e-9212-cd5a21800d75",
			landAreas: null,
			notes: null,
			phoneNumber: "0770973082",
			userName: "Lucian_T",
			zone: "South East",
		};
		const token =
			"cCI6IkpXVCJ9.eyJVc2VySUQiOiJhZTVjYmZmNi05MGYxLTRjNmUtOTIxMi1jZDVhMjE4MDBkNzUiLCJuYmYiOjE2MzE0MzQ3MDksImV4cCI6MTYzMTUyMTEwOSwiaWF0IjoxNjMxNDM0NzA5fQ._AEWKg3N0kTqWrqtEcIyPpZMU3W9Mec2jGD-SxPHKho'";
		context.login(demoData, token);
		setOpenModal(false);
		setNotify({
			isOpen: true,
			message: "Welcome",
		});
		history.push("/");
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	return (
		<>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Log in
					</Typography>
					<Typography variant="body1">(demo user preloaded)</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="userName"
							label="UserName"
							name="userName"
							autoComplete="username"
							value={user.userName}
							onChange={(e) => handleInputChange(e)}
							error={errors.userName !== ""}
							helperText={errors.userName}
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={user.password}
							onChange={(e) => handleInputChange(e)}
							error={errors.password !== ""}
							helperText={errors.password}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={(e) => handleSubmit(e)}
						>
							Log In
						</Button>
						<Grid container>
							<Grid item>
								<Button
									variant="contained"
									onClick={() => history.push("/register")}
								>
									Don't have an account? Register here!
								</Button>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
				<Notification {...{ notify, setNotify }} />
			</Container>

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openModal}
				onClose={() => setOpenModal(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 100,
				}}
			>
				<Fade in={openModal}>
					<Container className={classes.containerModal}>
						<Typography
							variant="h5"
							style={{
								textAlign: "center",
								paddingTop: "30px",
								paddingBottom: "10px",
							}}
						>
							Back-end server database unreachable at the moment...
						</Typography>
						<Typography variant="h6" style={{ textAlign: "center" }}>
							<InfoIcon color="primary" /> Loaded static demonstrative database.
						</Typography>
						<Typography variant="h6" style={{ textAlign: "center" }}>
							<InfoIcon color="primary" /> Creating & Editing entities not
							supported.
						</Typography>
						<hr />
						<Grid container justifyContent="flex-end">
							<>
								<Fab
									variant="extended"
									color="primary"
									className={classes.removeIcon}
									onClick={handleLogin}
								>
									<ArrowBackIcon />
									Proceed
								</Fab>
							</>
						</Grid>
					</Container>
				</Fade>
			</Modal>
		</>
	);
}
