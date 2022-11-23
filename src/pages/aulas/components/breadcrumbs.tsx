import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { paths } from 'routes/routes';

export default function ClassPageBreadcrumbs() {
	const history = useHistory();
	return (
		<Breadcrumbs aria-label='breadcrumb'>
			<Link
				underline='hover'
				color='primary'
				onClick={(e) => {
					e.preventDefault();
					history.push(paths.homePage);
				}}
			>
				Página inicial
			</Link>
			<Typography color='text.primary'>Aulas</Typography>
		</Breadcrumbs>
	);
}
