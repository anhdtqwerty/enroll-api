const User = "sapling";
const Password = "14ab78@#c9";
const CPCode = "SAPLING";
const ServiceID = "THPT-LTV";
const smsXMLTemplate =
  `<?xml version='1.0' encoding='utf-8'?>` +
  `<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:impl='http://impl.bulkSms.ws/'>` +
  `<soapenv:Header/>` +
  `   <soapenv:Body>` +
  `      <impl:wsCpMt>` +
  `         <User>${User}</User>` +
  `         <Password>${Password}</Password>` +
  `         <CPCode>${CPCode}</CPCode>` +
  `         <RequestID>1</RequestID>` +
  `         <UserID>{{userId}}</UserID>` +
  `         <ReceiverID>{{receiverId}}</ReceiverID>` +
  `         <ServiceID>${ServiceID}</ServiceID>` +
  `         <CommandCode>bulksms</CommandCode>` +
  `         <Content>{{content}}</Content>` +
  `         <ContentType>0</ContentType>` +
  `      </impl:wsCpMt>` +
  `   </soapenv:Body>` +
  ` </soapenv:Envelope>`;

const balanceXMLTemplate =
  `<?xml version='1.0' encoding='utf-8'?>` +
  `<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:impl='http://impl.bulkSms.ws/'>` +
  `<soapenv:Header/>` +
  `   <soapenv:Body>` +
  `      <impl:checkBalance>` +
  `         <User>${User}</User>` +
  `         <Password>${Password}</Password>` +
  `         <CPCode>${CPCode}</CPCode>` +
  `         <ServiceID>${ServiceID}</ServiceID>` +
  `         <RequestID>1</RequestID>` +
  `      </impl:checkBalance>` +
  `   </soapenv:Body>` +
  ` </soapenv:Envelope>`;

const smsFee = 450; //đ/ SMS
const viettelMaximumSMSLength = 160;
const vietelFirstSMSLength = 122;
const viettelStartNums = [
  `086`,
  `096`,
  `097`,
  `098`,
  `032`,
  `033`,
  `034`,
  `035`,
  `036`,
  `037`,
  `038`,
  `039`,
  `8486`,
  `8496`,
  `8497`,
  `8498`,
  `8432`,
  `8433`,
  `8434`,
  `8435`,
  `8436`,
  `8437`,
  `8438`,
  `8439`,
];

const isViettelProvider = (userPhone) => {
  const userPhoneStartNum = userPhone.slice(0, 3);
  return viettelStartNums.includes(userPhoneStartNum);
};

const getMsgNum = async (userPhone, content) => {
  if (isViettelProvider(userPhone)) {
    if (content.length <= vietelFirstSMSLength) return 1;
    else
      return (
        2 +
        Math.floor(
          (content.length - vietelFirstSMSLength) / viettelMaximumSMSLength
        )
      );
  } else return 1 + Math.floor(content.length / viettelMaximumSMSLength);
};
const getSMSfee = async (userPhone, msgContent) => {
  const msgNum = getMsgNum(userPhone, msgContent);
  return msgNum * smsFee;
};

const getBalanceXML = () => {
  return balanceXMLTemplate;
};

const getSMSXML = (userPhone, msgContent, otp) => {
  msgContent = msgContent.replace("{{otp}}", otp);
  return smsXMLTemplate
    .replace(`{{userId}}`, userPhone)
    .replace(`{{receiverId}}`, userPhone)
    .replace(`{{content}}`, msgContent);
};

module.exports = {
  getSMSXML,
  getBalanceXML,
  getSMSfee,
};
