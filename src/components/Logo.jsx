import logo from "../assets/logo2.png";
function Logo({ width = "50px" }) {
	return <img src={logo} alt="Logo" style={{ width }} />;
}

export default Logo;
