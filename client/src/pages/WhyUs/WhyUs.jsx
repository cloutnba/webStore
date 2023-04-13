import { Box, Container } from '@mui/material';
import { motion } from "framer-motion"
import ShopingOnline from "./img/shopping-online-2.jpg"
import FirstEvidence from "./img/istock-1269266185.jpg"
import SecondEvidence from "./img/laptop-1280x720.png"
import ThirdEvidence from "./img/sale.jpg"
import FourthEvidence from "./img/suport.png"
import FifthEvidence from "./img/delivery.jpg"

import './WhyUs.scss'

const blockAnimation = {
    hidden: {
        y: -100,
        opacity: 0,
    },
    visible: custom => ({
        y: 0,
        opacity: 1,
        transition: { delay: custom * 0.2 }
    }),
}

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


export const WhyUs = () => {

    return (
        <Container className='why-us-page' maxWidth="lg">
            <motion.Box initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2, once: true }} custom={3} variants={blockAnimation} className='evidence-block'>
                <motion.img className='why-us-img' src={ShopingOnline} alt="ShopingOnline" />
                <p className='main-header-whyus'>Why you should choose us ? </p>
            </motion.Box>
            <motion.Box className='evidence-block'>
                <motion.Box initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2, once: true }} custom={5} variants={textAnimation} className='main-description-whyus'>
                    <p>
                        First, it saves precious time. Agree, in the "online" mode, you can familiarize yourself with the product range much faster than wandering through ordinary stores, which may be located quite far from your home. </p>
                </motion.Box>
                <motion.img initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2, once: true }} custom={5} variants={blockAnimation} className='why-us-img' src={FirstEvidence} alt="FirstEvidence" />
            </motion.Box>

            <motion.Box className='evidence-block'>
                <motion.img initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2, once: true }} custom={3} variants={blockAnimation} className='why-us-img' src={SecondEvidence} alt="SecondEvidence" />
                <motion.Box initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2, once: true }} custom={3} variants={textAnimation} className='main-description-whyus'>
                    <p>
                        Secondly, by visiting our online store and going to the "Products" category, all available product offers will appear in front of you in a few seconds - with high-quality photos, descriptions and detailed characteristics. </p>
                </motion.Box>
            </motion.Box>

            <motion.Box className='evidence-block'>
                <motion.Box initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2, once: true }} custom={3} variants={textAnimation} className='main-description-whyus'>
                    <p>
                    Thirdly, it is very profitable. Our online store has much more affordable prices than other stores. Moreover, quite often we delight customers with promotions, discounts, bonus programs. </p>
                </motion.Box>
                <motion.img initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2, once: true }} custom={3} variants={blockAnimation} className='why-us-img' src={ThirdEvidence} alt="FirstEvidence" />
            </motion.Box>

            <motion.Box className='evidence-block'>
            <motion.img initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2, once: true }} custom={3} variants={blockAnimation} className='why-us-img' src={FourthEvidence} alt="FirstEvidence" />
                <motion.Box initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2, once: true }} custom={3} variants={textAnimation} className='main-description-whyus'>
                    <p>Fourth, it's professional but unobtrusive customer support. Need help choosing a laptop? Just call us and the employees of the online store will be happy to process and provide comprehensive information. </p>
                </motion.Box>
            </motion.Box>

            <motion.Box className='evidence-block'>
                <motion.Box initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2, once: true }} custom={3} variants={textAnimation} className='main-description-whyus'>
                    <p>Fifth, it is prompt delivery to your city. You place an order, specify the delivery address - and within 2-3 days you will have a laptop at your disposal.</p>
                </motion.Box>
                <motion.img initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2, once: true }} custom={3} variants={blockAnimation} className='why-us-img' src={FifthEvidence} alt="FirstEvidence" />
            </motion.Box>




        </Container>
    )

}

export default WhyUs