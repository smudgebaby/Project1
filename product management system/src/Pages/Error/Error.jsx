import './Error.css'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Error() {
	// TODO: router to home page when click button

  return (
    <>
        <div className="error-container">
					<ErrorOutlineIcon style={{ color: '#5b6af5', fontSize: 80 }} />
          <p className='description'>Oops, something went wrong!</p>
          <button className='home-button'>Go Home</button>
        </div>
    </>
  )
}

export default Error
