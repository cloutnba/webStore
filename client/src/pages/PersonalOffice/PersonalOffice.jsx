import { Container } from "@mui/material"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LogoutIcon from '@mui/icons-material/Logout';
import {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import UserData from "./components/UserData";
import AllUserOrders from "./components/AllUserOrders";
import BreadCrumbs from "../../components/BreadCrumbs";
import ChangePassword from "./components/ChangePassword";
import setAuthToken from "../../helpers/setAuthToken";
import { selectorPageLoadingPersonalOffice } from "../../selectors";
import './PersonalOffice.scss';
import Preloader from "../../components/Preloader";
import { Link } from "react-router-dom";
import { actionToken, actionAuthorizationUser, actionFavoritesProductNew, actionUpdateFavorites, actionUpdateBasket, actionBasketProductNew} from "../../reducers";


const PersonalOffice = () => {

    const [value, setValue] = useState('1');
    const pageLoading = useSelector(selectorPageLoadingPersonalOffice)
    const dispatch = useDispatch()

   const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const exitFromOffice = () => {
        localStorage.removeItem('token')
        setAuthToken(false)
        dispatch(actionToken('')) 
        dispatch(actionAuthorizationUser({}))
        dispatch(actionFavoritesProductNew([]))
        dispatch(actionUpdateFavorites([]))
        dispatch(actionUpdateBasket([]))
        dispatch(actionBasketProductNew([]))
    }

    return (
        <Container className="main-list" maxWidth="lg">
            <Preloader open={ pageLoading } />
            <BreadCrumbs linksArray={[{ link: "/personal-office", text: "Personal office" }]} />
            <p className="header-personal-office">Personal <span className="title_contrast">office</span></p>
          <Link to='/'> 
            <Box onClick={()=>exitFromOffice()
                } className="logout">< LogoutIcon sx={{ color: '#75758a',/*  "&:hover": {color: 'green'}, */ marginRight: '5px' }}/> <p>Exit</p></Box>
         </Link>
           
            <TabContext  value={value}  >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList className="tab-list"  onChange={handleChange} TabIndicatorProps={{sx:{backgroundColor:"green", height:"3px"}}}
          sx={{ display:'flex', flexDirection:'column',
             // задаем цвет со старта
             "& button": {color:"greey", backgroundColor: "white", transition: '0.7s'},
             "& button.Mui-selected": {color:"green", backgroundColor: "#d6e3d1", borderTopLeftRadius: "10px"/* , fontWeight: "700" */},
             // Задаем цвет активной вкладке
             "& button:focus": {color:"green" },
          }}>
                            <Tab label="Data" value="1" />
                            <Tab label="Password" value="2" />
                            <Tab label="Orders" value="3" />
                    </TabList>
                </Box>
                <TabPanel className="tab-panel" value="1"><UserData/></TabPanel>
                <TabPanel className="tab-panel" value="2"><ChangePassword/></TabPanel>
                <TabPanel className="tab-panel" value="3"><AllUserOrders/></TabPanel>
            </TabContext>

        </Container>
    )
}

export default PersonalOffice
