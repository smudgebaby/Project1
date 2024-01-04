import RotateLoader from "react-spinners/RotateLoader";
import './LoadSpinner.css'

function LoadSpinner() {
	return (
		<div className="load-container">
			<RotateLoader color="#5b6af5" speedMultiplier={0.5} />
		</div>
	)
}

export default LoadSpinner;