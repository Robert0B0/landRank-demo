import React from "react";
import {
	makeStyles,
	Modal,
	Container,
	Fab,
	Fade,
	Grid,
	Backdrop,
	Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	containerModal: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		width: "25rem",
		height: "15rem",
	},
}));

export default function DealModalDelete(props) {
	const { openDelete, setOpenDelete, handleDeleteDeal } = props;

	const classes = useStyles();
	return (
		<>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openDelete.isOpen}
				onClose={() => setOpenDelete({ isOpen: false })}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 100,
				}}
			>
				<Fade in={openDelete.isOpen}>
					<Container className={classes.containerModal}>
						<Typography
							variant="h5"
							style={{
								textAlign: "center",
								paddingTop: "50px",
								paddingBottom: "40px",
							}}
						>
							Are you Sure you want to remove This Deal permanently?
						</Typography>
						<hr />
						<Grid container justifyContent="flex-end">
							<>
								<Fab
									variant="extended"
									color="secondary"
									style={{ marginRight: "10px" }}
									onClick={() => handleDeleteDeal(openDelete.id)}
								>
									<DeleteForeverIcon />
									Remove Deal
								</Fab>
								<Fab
									variant="extended"
									color="primary"
									className={classes.removeIcon}
									onClick={() => setOpenDelete({ isOpen: false })}
								>
									<ArrowBackIcon />
									Back
								</Fab>
							</>
						</Grid>
					</Container>
				</Fade>
			</Modal>
		</>
	);
}
