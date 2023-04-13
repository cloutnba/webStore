import { Box, Container } from '@mui/material';
import { motion } from "framer-motion"
import './Rules.scss'

const textAnimation = {
    hidden: {
        x: -100,
        opacity: 0,
    },
    visible: custom => ({
        x: 0,
        opacity: 1,
        transition: { delay: custom * 0.2 }
    }),
}

const Rules = () => {
    return(
        <>
        <motion.Box  className='rules-paralax'  initial="hidden"
                whileInView="visible"
                viewport={{amount: 0.2, once: true}}>
            <Box className='our-rules'>
              <motion.p className='our-rules-text'  custom={1} variants={textAnimation}>Our rules</motion.p>
            </Box>
        </motion.Box>
        <Container   maxWidth="lg">
            <Box className='rules'>

           
            <p className='rules-description'>Welcome to BestLaptops24 These terms and conditions outline the rules and regulations for the use of BestLaptops24 Website.
By accessing this website we assume you accept these terms and conditions in full. Do not continue to use BestLaptops24 website if you do not accept all of the terms and conditions stated on this page.
The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements: Client, You and Your refers to you, the person accessing this website and accepting the Company’s terms and conditions. The Company, Ourselves, We, Our and Us, refers to our Company. Party, Parties, or Us, refers to both the Client and ourselves, or either the Client or ourselves.
All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services/products, in accordance with and subject to, prevailing law.
Any use of the above terminology or other words in the singular, plural, capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

<h5 className='rules-header'>Disclaimer</h5>

<p  className='rules-description'>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose and/or the use of reasonable care and skill).

Nothing in this disclaimer will:</p>

<ul  className='rules-description-list'>
    <li>Limit or exclude our or your liability for death or personal injury resulting from negligence.</li>
    <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation.</li>
    <li>Limit any of our or your liabilities in any way that is not permitted under applicable law.</li>
    <li>Or exclude any of our or your liabilities that may not be excluded under applicable law.</li>
</ul>
<p className='rules-description-list'>To the extent that the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
</Box>
        </Container >
        </>
    )
}

export default Rules