import GithubCat from "../assets/GithubCat.png";
import ExternalImg from "../assets/ExternalLink.png";
function Footer(){
    return(
        <div className="footer">
            <div className="footer-info">
                <h3>Hemavision ⋅ 2026</h3>
                <p>A Capstone Project ⋅ Dylan Gomez, Ananda Shrestha, Lainey Brekken, Breana Sinipete</p>
            </div>
            <a
                href="https://github.com/Gomezdylan/HemaVision"
                target="_blank"
                className="github-link"
            >
                <img 
                    src={GithubCat} 
                    className= "github-cat"
                    />
                <h3>GitHub</h3>
                <img 
                    src={ExternalImg} 
                    className="external-icon"
                />

            </a>
        </div>
    );
}

export default Footer;