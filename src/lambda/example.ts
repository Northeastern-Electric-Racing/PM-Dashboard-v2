import { Context } from 'aws-lambda';

export async function handler(event: any, context: Context) {
  try {
    return { statusCode: 200, body: "example!" };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}