import { Header } from "@/app/sections/header"
import { Magazine } from "../magazine"
import { Gallery } from "../gallery"

export function Main(){
    return (
        <div>
            <Header />
            <Magazine />
            <Gallery />
        </div>
    )
}