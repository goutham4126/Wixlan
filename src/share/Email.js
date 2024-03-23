import { EmailShareButton } from "react-share"
import { MdOutlineMail } from "react-icons/md";

function Email({url,message}) {
  return (
    <div>
        <EmailShareButton url={url} title={message}>
            <MdOutlineMail className="size-9 m-2"/>
        </EmailShareButton>
    </div>
  )
}

export default Email