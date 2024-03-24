// pages/api/submissions.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Only allow GET requests for this endpoint
  if (req.method === 'GET') {
    try {
      // Define the path to the submissions.json file
      const filePath = path.join(process.cwd(), 'data', 'submissions.json');

      // Read the data from the file
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData.toString());

      // Return the submissions data as a JSON response
      res.status(200).json(data);
    } catch (error) {
      console.error('Failed to read submissions data:', error);
      res.status(500).json({ message: 'Failed to load submissions data.' });
    }
  } else {
    // Respond with a method not allowed error for non-GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
