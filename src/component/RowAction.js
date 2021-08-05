import React from 'react';
import { EditButton, ShowButton } from 'react-admin';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const RowAction = ({ basePath, record, resource, describe }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
  	const open = Boolean(anchorEl);

	const handleClick = (event) => {
	setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
	setAnchorEl(null);
	};

    return (
		<>
			<IconButton
				aria-label="more"
				aria-controls="rowMenu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="rowMenu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
			>
				<List component="nav" disablePadding={false}>
					<ListItem><ShowButton basePath={basePath} record={record}/></ListItem>
					{describe[resource] && describe[resource].updateable ? 
						 <ListItem><EditButton basePath={basePath} record={record} /> </ListItem>
						: null}
				</List>
			</Menu>
		</>
	)
};

export default RowAction;