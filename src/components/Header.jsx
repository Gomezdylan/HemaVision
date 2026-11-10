import bloodDrop from "../assets/blood-drip7.png";
import headerblood from "../assets/blood-dropHeader.png";
import headerclock from "../assets/blood-dropHeader2.png";
function Header({ setPage }) { // Prop pass so we can change the page in header

    // Still need to add prop so the about page can load from header
    return(
        <header className="header">
            <div className="logo">
                <img
                    src={bloodDrop}
                />
                <div>Hema<span>vision</span></div>
            </div>

            <nav className="tabs">
                <button onClick={() => setPage("about")}> 
                    <img src={headerblood} />
                    About
                </button>
                <button onClick={() => setPage("history")}>
                    <img src={headerclock} />
                    History
                </button>
            </nav>
        </header>
    );
}

export default Header;