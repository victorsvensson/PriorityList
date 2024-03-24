// pages/api/submit-form.js
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Generate a new UUID for the submission
    const newSubmission = {
        ...req.body,
        id: uuidv4(), // Assign a unique ID to each new submission
      };

    // Path to the JSON file
    const filePath = path.join(process.cwd(), 'data', 'submissions.json');

    // Read the current data in the file
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData.toString());

     // Add the new submission
     data.push(newSubmission);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    // Respond to the request indicating success
    res.status(200).json({ message: 'Submission added successfully!' });
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
