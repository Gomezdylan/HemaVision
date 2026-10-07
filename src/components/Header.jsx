import HemaLogo from "../assets/hemavision-logo.png";

function Header() {
    return(
        <header className="header">
            <img
                src={HemaLogo}
                className="logo"
            
            />

            <nav className="tabs">
                <button>About</button>
                <button>History</button>
            </nav>
        </header>
    );
}

export default Header;