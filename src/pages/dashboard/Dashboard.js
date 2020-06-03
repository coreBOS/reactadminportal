import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import config from '../../config';
import * as cbconn from 'corebos-ws-lib/WSClientm';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles((theme) => ({
  grow: {
	flexGrow: 1,
  },
  title: {
	display: 'none',
	overflow: 'unset',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  root: {
    width: '100%',
    maxWidth: '136ch',
    backgroundColor: theme.palette.background.paper,
	margin: 'auto',
	marginTop: '0.4rem',
  },
  margtop: {
	marginTop: '0.2rem',
	borderBottom: "1px solid",
  },
  inline: {
    display: 'inline',
  },
}));

export default function PrimarySearchAppBar() {
	const classes = useStyles();
	const translate = useTranslate();
	const [data, setData] = useState([]);
	let fieldTypecache = {};
	let logdata = localStorage.getItem('coreboslogindata');
	logdata = logdata && JSON.parse(logdata);
	const fetchData = async (ev) => {
		let params = {
			'query': ev.currentTarget.value,
			'search_onlyin': config.DescribeModules.join(','),
			'restrictionids': JSON.stringify({ 'userId': logdata.userId, 'accountId': '11x0', 'contactId': '12x0', 'limit': 25 })
		};
		const data = await cbconn.doInvoke('getSearchResultsArray', params, 'POST');
		setData(data);
	}
	const getFieldTypesFromRow = (row) => {
		fieldTypecache[row.search_module_name] = {};
		let foundT = false;
		let foundH = false;
		let foundB = false;
		let firstfield = '';
		for (var [field, val] of Object.entries(row)) {
			if (field==='search_module_name' || field==='id') {
				continue;
			}
			if (firstfield==='') {
				firstfield = field;
			}
			let idx = window.coreBOS.Describe[row.search_module_name].fields.findIndex((elem) => (elem.label_raw===field && elem.summary==='T'));
			if (idx!==-1) {
				foundT = true;
				fieldTypecache[row.search_module_name].title = field;
			}
			idx = window.coreBOS.Describe[row.search_module_name].fields.findIndex((elem) => (elem.label_raw===field && elem.summary==='H'));
			if (idx!==-1) {
				foundH = true;
				fieldTypecache[row.search_module_name].header = field;
			}
			idx = window.coreBOS.Describe[row.search_module_name].fields.findIndex((elem) => (elem.label_raw===field && elem.summary==='B'));
			if (idx!==-1) {
				foundB = true;
				fieldTypecache[row.search_module_name].body = field;
			}
			if (foundT && foundH && foundB) {
				break;
			}
		}
		if (!foundT) {
			fieldTypecache[row.search_module_name].title = firstfield;
		}
		if (!foundH) {
			fieldTypecache[row.search_module_name].header = firstfield;
		}
		if (!foundB) {
			fieldTypecache[row.search_module_name].body = firstfield;
		}
	}
	const getTitleFieldFromRow = (row) => {
		if (!fieldTypecache[row.search_module_name]) {
			getFieldTypesFromRow(row);
		}
		return row[fieldTypecache[row.search_module_name].title];
	}
	const getHeaderFieldFromRow = (row) => {
		if (!fieldTypecache[row.search_module_name]) {
			getFieldTypesFromRow(row);
		}
		return row[fieldTypecache[row.search_module_name].header];
	}
	const getBodyFieldFromRow = (row) => {
		if (!fieldTypecache[row.search_module_name]) {
			getFieldTypesFromRow(row);
		}
		return '  -  '+row[fieldTypecache[row.search_module_name].body];
	}
	const getModuleIcon = (mod) => {
		return config.ModuleIcons[mod];
	}

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {config.AppName}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
			  placeholder={translate('dashboard.searchInputPlaceholder')}
			  onChange={fetchData}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
		{
			data.length > 0 &&
		<List className={classes.root}>
			{data.map( row => (
			<ListItem alignItems="flex-start" className={classes.margtop} title={row.search_module_name} onClick={() => {window.location='#/'+row.search_module_name+'/'+row.id+'/show';}}>
				<ListItemAvatar>
				{getModuleIcon(row.search_module_name)}
				</ListItemAvatar>
				<ListItemText
				primary={getTitleFieldFromRow(row)}
				secondary={
					<React.Fragment>
					<Typography
						component="span"
						variant="body2"
						className={classes.inline}
						color="textPrimary"
					>
						{getHeaderFieldFromRow(row)}
					</Typography>
					{getBodyFieldFromRow(row)}
					</React.Fragment>
				}
				/>
			</ListItem>
			)
			)}
		</List>
		}
    </div>
  );
}
