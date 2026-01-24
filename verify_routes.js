const axios = require('axios');

async function testRoutes() {
    const baseURL = 'http://localhost:3000';
    let testId = '';

    try {
        console.log('--- Testing POST /albums ---');
        const postRes = await axios.post(`${baseURL}/albums`, {
            title: "Verification Album",
            releaseYear: 2024,
            type: "Studio",
            tracklist: ["Track A", "Track B"],
            totalDuration: "40:00",
            members: ["Artist 1"]
        });
        console.log('POST Status:', postRes.status);
        testId = postRes.data.insertedId;
        console.log('Inserted ID:', testId);

        console.log('\n--- Testing GET /albums/:id ---');
        const getRes = await axios.get(`${baseURL}/albums/${testId}`);
        console.log('GET Status:', getRes.status);
        console.log('Album Title:', getRes.data.title);

        console.log('\n--- Testing PUT /albums/:id ---');
        const putRes = await axios.put(`${baseURL}/albums/${testId}`, {
            title: "Updated Verification Album",
            releaseYear: 2025,
            type: "Live",
            tracklist: ["Track A", "Track B", "Track C"],
            totalDuration: "45:00",
            members: ["Artist 1", "Artist 2"]
        });
        console.log('PUT Status:', putRes.status);

        console.log('\n--- Testing DELETE /albums/:id ---');
        const delRes = await axios.delete(`${baseURL}/albums/${testId}`);
        console.log('DELETE Status:', delRes.status);

        console.log('\nVerification Successful!');
    } catch (error) {
        console.error('Verification Failed:', error.response ? error.response.data : error.message);
    }
}

testRoutes();
