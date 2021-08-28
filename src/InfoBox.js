import { Card ,CardContent,Typography} from '@material-ui/core'
import React from 'react'
import './InfoBox.css'
function InfoBox({title,cases,total,active,isRed, ...props}) {
    return (
        <Card onClick={props.onClick} className={`InfoBox ${active && "infoBox--seleted"} ${isRed && 'infoBox--red'}`}>
            <Typography className="InfoBox__title" color="textSecondary">{title}</Typography>
            <h2 className={`InfoBox__cases ${!isRed && "infoBox--green"}`}>{cases}</h2>
            <Typography className="InfoBox__total" color="textSecondary">{total} Total</Typography>
        </Card>
    )
}

export default InfoBox
