import bloodDrop from "../assets/blood-drip7.png";
import headerblood from "../assets/blood-dropHeader.png";
import headerclock from "../assets/blood-dropHeader2.png";
function Header() {
    return(
        <header className="header">
            <div className="logo">
                <img
                    src={bloodDrop}
                />
                <div>Hema<span>vision</span></div>
            </div>

            <nav className="tabs">
                <button>
                    <img src={headerblood} />
                    About
                </button>
                <button>
                    <img src={headerclock} />
                    History
                </button>
            </nav>
        </header>
    );
}

export default Header;