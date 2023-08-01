import openai from "@/app/openai";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';
type Data = {
    name: string;
}

export async function POST(
    req:Request
){
    const completion = await openai.createCompletion({
        model:'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content:'what is 1+1',
            },
        ],
    });
    const responseText = completion.data.choices[0].message.content;

    NextResponse.json(responseText)
}