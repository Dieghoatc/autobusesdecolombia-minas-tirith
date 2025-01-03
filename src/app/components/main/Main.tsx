'use client'

import {useState, useEffect} from "react"

import { autobusesApiAdapter } from "../../api/autobusesApi.adapter"
import { PhotoResponse } from "../../api/autobusesApi.adapter"

import Card from "./components/Card/Card"
import "./main.css"


export default function Main() {

    const [data, setData] = useState([])

    useEffect(() => {
        autobusesApiAdapter().then(data => setData(data))
    },[])

    return (
        <div className="main-container">
           {
            data.map((photo: PhotoResponse ) => {
                return (
                    <div key={photo.id} >
                         <Card url={photo.url} company={photo.company} bodywork={photo.bodywork} engine={photo.engine} serial={photo.serial} />
                    </div>
                )
            })
           }
        </div>
    )
}