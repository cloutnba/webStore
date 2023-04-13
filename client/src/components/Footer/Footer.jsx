import {Box, Container} from "@mui/material";
import {ReactComponent as SubscribeSvg} from "./icons/subscribeSvg.svg";
import {ReactComponent as CallSvg} from "./icons/phone-call.svg";
import {ReactComponent as VisaSvg} from "./icons/visa.svg";
import {ReactComponent as MasterCardSvg} from "./icons/mastercard.svg";
import {ReactComponent as SendSvg} from "./icons/Group.svg";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './Footer.scss';
import {Link} from "react-router-dom";
import {useState} from "react";


const Footer = () => {
    const [emailInputValue, setEmailInputValue] = useState('');

    const emailInputHandler = (e) => {
        setEmailInputValue(e.target.value);
    }


    return (
        <>
            <footer className="footer">
                    <Box className="footer__subscribe-container">
                        <Container maxWidth="xl">
                            <Box className="footer__subscribe-wrapper">
                                <Box className="subscribe__content">
                                    <Box className="subscribe__logo-wrapper">
                                        <SubscribeSvg className="subscribe__logo"/>
                                    </Box>
                                    <Box className="subscribe__text-wrapper">
                                        <h4 className="subscribe__text">
                                            <span className="subscribe__text--colored">Subscribe</span> <br/> to news and
                                            promotions
                                        </h4>
                                    </Box>
                                </Box>
                                <Box className="subscribe__input-wrapper">
                                <input type="email" className="subscribe__input" placeholder="Write email"
                                           value={emailInputValue} onChange={emailInputHandler}/>
                                    <button type="submit"
                                            className="subscribe__button">{window.innerWidth > 996 ? "Subscribe" :
                                        <SendSvg/>}
                                    </button>
                                </Box>
                                <Box className="subscribe__call-wrapper">
                                    <Box className="subscribe__call-logo-wrapper">
                                        <CallSvg className="subscribe__call-logo"/>
                                    </Box>
                                    <Box className="subscribe__call-text-wrapper">
                                        <h4 className="subscribe__call-text">Request a call</h4>
                                    </Box>
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                    <Box className="footer__info-container">
                        <Container maxWidth="xl">
                            <Box className="footer__info-wrapper">
                                <Box className="social-media-wrapper">
                                    <Box className="footer__logo-wrapper">
                                        <Link to="/" className="logo social-media-logo">
                                            {window.innerWidth > 996 ? "BestLaptops" : "BL"}<span
                                            className="colored">24</span>
                                        </Link>
                                    </Box>
                                    <Box className="footer__desc">© 2015 – 2023 BestLaptops 24</Box>
                                    <Box className="social-media">
                                        <FacebookOutlinedIcon className="social-media-icon"/>
                                        <TwitterIcon className="social-media-icon"/>
                                        <InstagramIcon className="social-media-icon"/>
                                        <YouTubeIcon className="social-media-icon"/>
                                    </Box>
                                </Box>
                                <Box className="payments-wrapper">
                                    <Box className="payment-method">
                                        <VisaSvg className="payment-method-icon"/>
                                    </Box>
                                    <Box className="payment-method">
                                        <MasterCardSvg className="payment-method-icon"/>
                                    </Box>
                                </Box>
                            </Box>
                        </Container>
                    </Box>
            </footer>
        </>
    )
}

export default Footer;
