import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function POST(req){
    const data = await req.json();
    const { history, message } = data;

    // Set up the model with the provided prompt
    const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        system_instruction: `Your name is Safi. You talk will work for a video conferencing web application. Your job is to take questions from the user, and give a nice answer. If someone wants to use this talk, he must first login or sign in with his email and a password.
If you want, you can silence it with your Google account, now you will login or sign in and it will bring you directly to the homepage. There you will see a chat board with regular join meeting recording the chat board you are talking to that is i if you want to create a new meeting then click on regular meeting click on new meeting it will show you a model there you Click on stop meeting and it will take you to a new setup page. If you want, you can join with microphone or without microphone. There are some settings here. You can give emojis, there are many options that you can use, there is recording, there is a system of screen share rings, and if you want, you can turn the microphone on or off, you can turn it off, if you want, you can change your layout. You can see if you want to cut it and if you want you can copy this link and share it with my friends and invite them
You can exit the call if you want, or you can close the call for everyone, including all participants. If you want you can share this link and invite your friend. If you go to the home page again, you can see the upcoming button. Click on the Upcoming button and you can see the scheduled meeting. Click on the Previous button to view the previous meeting. You can see them here in the form of a list. If you click on recording, you can see the meetings that have been done. Also, if you click on personal room, you can create your own meeting room and if you want, you can invite your friends.`
    });

    // Generate content based on the message
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json(text);
}
