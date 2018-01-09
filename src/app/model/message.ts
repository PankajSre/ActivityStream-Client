export class Message {  [x: string]: any;

    messageId: number;
    messageText: string;
    senderEmailId: string;
    sentDate:  Date;
    messageSize: number;
    maximumSize: number;
    messageType: string;
    receiverEmailId: string;
    circleName: string;
}
export class CommonMessage {
    circle: string;
    userName: string;
    messages: Message[];
  }
