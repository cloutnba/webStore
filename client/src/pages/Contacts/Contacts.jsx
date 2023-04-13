import './Contacts.scss';
import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Contacts = () =>{
    const API_KEY = process.env.YOUR_API_KEY
    console.log(API_KEY)

    const containerStyle = {
        width: '52.8vw',
        height: '400px'
    };

    const center = {
        lat: -3.745,
        lng: -38.523
    };


    return(
        <div className="all_container">
            <div className="contacts">
                <h2 className="contacts_header">ISSUE <span className="point_span"> POINT</span></h2>
                <Card  className='card'  sx={{ maxWidth: 345}}>
                    <a href="https://klike.net/uploads/posts/2022-04/1649917181_2.jpg">
                        <CardActionArea>
                            <CardContent>
                                <p className="number_point">01</p>
                                <Typography gutterBottom variant="h5" component="div">
                                    <p>BestLaptops24</p>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <p>Khreshchatyk,13</p>
                                </Typography>
                                <Typography variant="body3" color="text.secondary">
                                    <p className="link_shop" >BestLaptops24.ua</p>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </a>
                </Card>
                <Card  className='card'  sx={{ maxWidth: 345}}>
                    <a href="https://youtu.be/noAUBPrNBxY">
                        <CardActionArea>
                            <CardContent>
                                <p className="number_point">02</p>
                                <Typography gutterBottom variant="h5" component="div">
                                    <p>BestLaptops24</p>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <p>Independence Square,1</p>
                                </Typography>
                                <Typography variant="body3" color="text.secondary">
                                    <p className="link_shop" >NotBestLaptops24.ua</p>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </a>
                </Card>

            </div>

            <div className="map">
                <LoadScript
                    googleMapsApiKey={API_KEY}
                >
                    <GoogleMap className = "GoogleMap"
                               style="width:100%"
                               mapContainerStyle={containerStyle}
                               center={center}
                               zoom={10}
                    >
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>

    )
}

export default Contacts;