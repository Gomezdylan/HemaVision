import bloodDrop from "../assets/blood-drip7.png";

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
                <button>About</button>
                <button>History</button>
            </nav>
        </header>
    );
}

export default Header;