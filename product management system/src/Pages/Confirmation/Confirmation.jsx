import './Confirmation.css'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { useNavigate } from "react-router";

function Confirmation() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/')
  }

  return (
    <>
      <div className='confirmation-container'>
        <div className="confirmation">
        <button className='close-button' onClick={handleClose}>close</button>
          <ForwardToInboxIcon style={{ color: '#5b6af5', fontSize: 55 }} />
          <p className='description'>We have sent the update password link to your email, please check that!</p>
        </div>
      </div>
    </>
  )
}

export default Confirmation
