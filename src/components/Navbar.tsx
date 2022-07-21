import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LoginForm from './LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onLogoutSuccess } from '../reducer';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const ResponsiveAppBar = (): React.ReactElement => {
  const isLoggedIn = useSelector((state: any) => state?.flicker?.isLoggedIn);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout =() =>{
    dispatch(onLogoutSuccess());
        setTimeout(() => {
          navigate("/");
        }, 0);
  }


  return (
    <>
      <AppBar position="static" style={{}} >
        <Container maxWidth="xl" style={{ display: 'flex', justifyContent: 'center', background: 'black' }}>
          <Toolbar disableGutters style={{ display: 'flex', width: '80%' }}>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              // href="/"
              onClick={()=>{
                navigate("/");

              }}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                color: "#fff",
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            
            <Box marginLeft="15px" marginRight={"15px"}>
              <Link to="/" style={{ color: 'white' }}>Home</Link>
            </Box>
            {
              isLoggedIn ?
                <Box marginLeft="15px" marginRight={"15px"}>
                  <Link to="/user" style={{ color: 'white' }}>Account</Link>
                </Box> : null
            }
                <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
{    !isLoggedIn ?             <Button variant="contained" onClick={handleOpen}>Login</Button> :
 <Button variant="contained" onClick={logout}>Logout</Button>
}
                </Box>
                
            
            {/* <Box sx={{ flexGrow: 0 }}>
          <Button variant="contained">Sign Up</Button>
          </Box> */}
          </Toolbar>
        </Container>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <LoginForm handleClose={handleClose} />
        </Box>

      </Modal>
    </>
  );
};
export default ResponsiveAppBar;
