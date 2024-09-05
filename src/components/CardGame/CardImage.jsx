import React from "react"
import { Image, Text } from "react-native"
import CONFIG from "../../utils/constants"

const IMG_SERVER_URL = CONFIG.img

const CardImage = ({img, style}) => {

    if(!img || img === undefined) {
        console.log("No image found")
        return  (
            <Image style={style} source={{uri: IMG_SERVER_URL + '404.jpg'}} />
        )
    }
       
    
    const imageUrl = `data:image/jpeg;base64,${img}`;
    return (
        //<Image style={style} source={{uri: IMG_SERVER_URL + img_url}} />
        <Image style={style} source={{uri: imageUrl}} />
    )
}

export default CardImage