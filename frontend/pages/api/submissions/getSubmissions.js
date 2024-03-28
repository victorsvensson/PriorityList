import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const filePath = path.join(process.cwd(), 'data', 'submissions.json');
            const fileData = fs.readFileSync(filePath);
            const data = JSON.parse(fileData.toString());
            res.status(200).json(data);
        } catch (error) {
            console.error('Failed to read submissions data:', error);
            res.status(500).json({ message: 'Failed to load submissions data.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
