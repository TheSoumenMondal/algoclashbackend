// Simple test script to verify submission queue
const axios = require('axios');

const testSubmission = {
    "userId": "534546",
    "problemId": "688cccf3b213af7506df8987",
    "code": "public class Solution { public static void main(String[] args) { System.out.println(10); } }",
    "language": "JAVA"
};

async function testAPI() {
    try {
        console.log('Sending test submission:', JSON.stringify(testSubmission, null, 2));
        
        const response = await axios.post('http://localhost:3000/api/v1/submission', testSubmission, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

testAPI();
