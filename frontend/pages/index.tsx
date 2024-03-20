'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddLinkForm from '../components/AddLinkForm';
import Layout from '../layouts/layout'; // Adjust the import path as necessary
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Button, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ConfirmationDialog from '../components/ConfirmationDialog'; // Adjust the path as needed
import EditLinkForm from '../components/EditLinkForm'; // Adjust the path as needed


// Create a theme instance.
const theme = createTheme({
  // Customize your theme here
});

export default function Home() {

  const [formVisible, setFormVisible] = useState(false);

  const handleOpenForm = () => setFormVisible(true);
  const handleCloseForm = () => {
    setFormVisible(false);
    setEditingData(null); // Reset editing data
    fetchSubmissions(); // Refresh the submissions list to reflect any changes
  };

  const [submissions, setSubmissions] = useState<any[]>([])
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSubmissionId, setCurrentSubmissionId] = useState(null);

  //Edit
  const [editFormVisible, setEditFormVisible] = useState(false);
  const handleOpenEditForm = () => setEditFormVisible(true);
  const [editingData, setEditingData] = useState(null); // Assuming the data structure matches your submissions

  useEffect(() => {
    fetchSubmissions();
  }, [handleCloseForm]);

  const handleEditButtonClick = (id: any) => {
    setEditingData(id); // Set the data to be edited
    setEditFormVisible(true); // Show the form
  };

  const handleOpenDialog = (id: any) => {
    setCurrentSubmissionId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditFormVisible(false);
  };

  const handleConfirmDelete = async () => {
    if (currentSubmissionId) {
      await fetch(`/api/submissions/${currentSubmissionId}`, {
        method: 'DELETE',
      });
      setDialogOpen(false);
      // Re-fetch submissions or update state as needed
    }
  };

  const fetchSubmissions = async () => {
    const response = await fetch('/api/submissions');
    const data = await response.json();
    setSubmissions(data);
  };

  return (
    <div>
      
  <ConfirmationDialog
    isOpen={dialogOpen}
    onClose={handleCloseDialog}
    onConfirm={handleConfirmDelete}
    title="Confirm Deletion"
    message="Are you sure you want to delete this submission?"
  />

{
  editFormVisible && (
    <EditLinkForm
      isVisible={editFormVisible}
      initialData={editingData}
      onClose={handleCloseDialog}
    />
  )
}

<Container>
<Typography variant="h3" component="h3" text-align="center">
    Prioriteringslista klientgruppen
  </Typography>
  <Button sx={{marginTop: 1}} variant="contained" color="success" onClick={handleOpenForm}>New</Button>

  <AddLinkForm isVisible={formVisible} onClose={handleCloseForm} />
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table aria-label="submissions table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Responsible</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Remove</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission, index) => (
              <TableRow key={index}>
                <TableCell>{submission.title}</TableCell>
                <TableCell>{submission.description}</TableCell>
                <TableCell>{submission.responsible}</TableCell>
                <TableCell>{submission.startDate}</TableCell>
                <TableCell>{submission.endDate}</TableCell>
                <TableCell>
                  <Button sx={{marginTop: 1}}
                  variant="contained"
                  color="error"
                  onClick={() => handleOpenDialog(submission.id)}
                  >
                  Remove
                  </Button>
                </TableCell>
                <TableCell>
                  {/* <Button sx={{marginTop: 1}}
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditButtonClick(submission.id)}
                  >
                    Edit
                  </Button> */}
                  <TableCell>
                <Button
                  sx={{marginTop: 1}}
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditButtonClick(submission)} // Pass the entire submission as the parameter
                >
                  Edit
                </Button>
              </TableCell>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </div>
  );
}
