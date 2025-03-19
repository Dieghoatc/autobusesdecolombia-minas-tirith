import "./loaderIntro.css"
import abcLogo from "@/assets/abclogo.png"

export function LoaderIntro() {
    return (
        <div className="loader-intro_container">
            <img src={abcLogo.src} alt="autobuses de colombia logo" className="abc-logo" />
            <h1>Autobuses de Colombia</h1>
        </div>
    )
}