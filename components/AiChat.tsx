import React, { useState } from 'react';

const AiChat = () => {
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  console.log('hello', chatHistory);
  const surpriseQuestion = [
    'How do I join a video call?',
    "What happens if I click on the 'End Call' button?",
    'Is there a way to raise my hand during a video call?',
    'How can I invite someone to join my ongoing video call?',
    'Where can I find the participant list during a video call?',
    'Is there a way to switch between different video layouts?',
    'How do I share a screen with other participants during a call?',
  ];

  const SurpriseRandom = () => {
    const randomValue =
      surpriseQuestion[Math.floor(Math.random() * surpriseQuestion.length)];

    setValue(randomValue);
  };

  const getResponse = async () => {
    if (!value) {
      setError('Error! Please ask a question');
      return;
    }

    try {
      setLoading(true); // Set loading to true when sending request

      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch('/api/gemini', options);
      const data = await response.text();
      console.log(data);
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        { role: 'user', parts: value },
        { role: 'model', parts: data },
      ]);
      setValue('');
      setError('');
    } catch (error) {
      console.error(error);
      setError('Something went wrong! Please try again later.');
    } finally {
      setLoading(false); // Set loading to false after receiving response
    }
  };

  const clear = () => {
    setValue('');
    setError('');
    setChatHistory([]);
  };

  return (
    <section className="flex flex-col size-full gap-5 h-[600px]">
      <h1 className="text-3xl font-bold"> Chat with Artificial intelligent</h1>
      <div className="bg-dark-1 h-full p-3 flex flex-col gap-3 rounded-md">
        <div className="flex items-center ">
          <p className="py-2 px-3 bg-blue-1  rounded-l-md">
            What do you want to khow ?
          </p>
          <button
            onClick={SurpriseRandom}
            disabled={!chatHistory}
            className="py-2 px-3 bg-blue-1  border-black rounded-r-md border-l-4 "
          >
            Surprise me
          </button>
        </div>
        <div className="flex-1 overflow-y-auto  rounded-md  p-4">
          {loading ? (
            <p>Wait Please...</p>
          ) : (
            chatHistory.map((chatItem, inx) => (
              <div className='' key={inx}>
                <p className='py-2 px-1 border rounded-md mb-2 bg-dark-2'>
                  {chatItem.role}: {chatItem.parts}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="flex items-center ">
          <input
            type="text"
            name=""
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask your Question...."
            className="py-2 flex-1 px-2 rounded-l-md border focus:outline-none focus:border-blue-1 text-black "
            id=""
          />
          {error ? (
            <button
              onClick={clear}
              className="py-2 px-3 bg-red-500 border border-red-500 rounded-r-md"
            >
              Clear
            </button>
          ) : (
            <button
              onClick={getResponse}
              className="py-2 px-3 bg-blue-1 border border-blue-1 rounded-r-md"
            >
              Ask
            </button>
          )}
        </div>
        <div>{error && <p className="text-red-500">{error}</p>}</div>
      </div>
    </section>
  );
};

export default AiChat;
