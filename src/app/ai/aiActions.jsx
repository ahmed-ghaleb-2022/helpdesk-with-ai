"use server";

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getAiActions(data, moreData) {
  
  const chatCompletion = await getGroqChatCompletion(data + " " + moreData);

  return chatCompletion.choices[0]?.message?.content || "";
}


export async function getTimeEstimate(data) {
  const prompt = `give me the time estimate in hours and minutes to solve this problem: ${data} without any explanation`;
  const chatCompletion = await getGroqChatCompletion(prompt);

  return chatCompletion.choices[0]?.message?.content || "";
}


export async function getClassification(data) {
  const prompt = `Classify the following problem as a software, network, or hardware problem. ${data} without any explanation`;
  const chatCompletion = await getGroqChatCompletion(prompt);

  return chatCompletion.choices[0]?.message?.content || "";
}


export async function getGroqChatCompletion(data) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: data,
      },
    ],

    model: "llama-3.3-70b-versatile",
  });
}
