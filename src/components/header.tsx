import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    letterSpacing: '2px',
    color: theme.palette.common.white,
    marginLeft: theme.spacing(2),
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          My App
        </Typography>
        {/* Add additional components to the right of the app name */}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
