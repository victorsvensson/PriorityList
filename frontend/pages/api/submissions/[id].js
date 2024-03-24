import fs from 'fs';
import path from 'path';

// Helper function to read the submissions file
async function readSubmissionsFile(filePath) {
  const fileData = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(fileData);
}

// Helper function to write to the submissions file
async function writeSubmissionsFile(filePath, data) {
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Function to handle PUT requests
async function updateSubmission(id, data, filePath) {
  const submissions = await readSubmissionsFile(filePath);
  const index = submissions.findIndex((item) => item.id === id);

  if (index === -1) {
    return { status: 404, body: { message: 'Submission not found' } };
  }

  submissions[index] = { ...submissions[index], ...data };
  await writeSubmissionsFile(filePath, submissions);
  return { status: 200, body: submissions[index] };
}

// Function to handle DELETE requests
async function deleteSubmission(id, filePath) {
  let submissions = await readSubmissionsFile(filePath);
  const initialLength = submissions.length;
  submissions = submissions.filter((item) => item.id !== id);

  if (submissions.length === initialLength) {
    return { status: 404, body: { message: 'Submission not found' } };
  }

  await writeSubmissionsFile(filePath, submissions);
  return { status: 200, body: { message: 'Submission removed successfully' } };
}

// Main handler function
export default async function handler(req, res) {
  const { id } = req.query;
  const filePath = path.join(process.cwd(), 'data', 'submissions.json');

  try {
    if (req.method === 'PUT') {
      const body = req.body; // Assuming body-parser middleware is used
      const result = await updateSubmission(id, body, filePath);
      return res.status(result.status).json(result.body);
    } else if (req.method === 'DELETE') {
      const result = await deleteSubmission(id, filePath);
      return res.status(result.status).json(result.body);
    } else {
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
