import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    // The path to the JSON file where submissions are stored
    const filePath = path.join(process.cwd(), 'data', 'submissions.json');

    // Read the existing submissions
    const fileData = fs.readFileSync(filePath);
    let submissions = JSON.parse(fileData.toString());

    // Find the index of the submission to update
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex === -1) {
      res.status(404).json({ message: 'Submission not found' });
      return;
    }

    // Update the submission with the new data from the request body
    const updatedSubmission = { ...submissions[submissionIndex], ...req.body };
    submissions[submissionIndex] = updatedSubmission;

    // Write the updated submissions back to the file
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

    res.status(200).json(updatedSubmission);
  } else {
    // Handle any non-PUT requests
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'DELETE') {
    const filePath = path.join(process.cwd(), 'data', 'submissions.json');
    const fileData = fs.readFileSync(filePath);
    let submissions = JSON.parse(fileData.toString());

    // Filter out the submission with the given id
    submissions = submissions.filter(submission => submission.id !== id);

    // Write the updated submissions back to the file
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

    res.status(200).json({ message: 'Submission removed successfully' });
  } else {
    // Handle any non-DELETE requests
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}