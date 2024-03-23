import { BsWhatsapp } from "react-icons/bs";
import { WhatsappShareButton } from 'react-share';

const WhatsAppButton = ({ url, message }) => {
  return (
    <WhatsappShareButton url={url} title={message}>
        <BsWhatsapp className="size-8 m-2"/>
    </WhatsappShareButton>
  );
};

export default WhatsAppButton
