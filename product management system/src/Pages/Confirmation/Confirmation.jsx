import './Confirmation.css'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

function Confirmation() {
  return (
    <>
      <div className='confirmation-container'>
        <div className="confirmation">
          <ForwardToInboxIcon style={{ color: '#5b6af5', fontSize: 55 }} />
          <p className='description'>We have sent the update password link to your email, please check that!</p>
        </div>
      </div>
    </>
  )
}

export default Confirmation
