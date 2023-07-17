import openai from "@/app/openai"

export async function handler(request,res){
    const completion = await openai.createCompletion({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "Say this is a test!"}],
    });
    const responseText = completion.data.choices[0].message.content;
    res.status(200).json(responseText);
}
// export async function GET(request){
//     return new Response("Hello")
// }

