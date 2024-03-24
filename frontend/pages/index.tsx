'use client'
import React, { useEffect, useState } from "react";
import AddLinkForm from '../components/AddLinkForm';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Button, Typography } from '@mui/material';
import ConfirmationDialog from '../components/ConfirmationDialog';
import EditLinkForm from '../components/EditLinkForm';
import { deletePost } from '../services/deleteService';

export default function Home() {

  const [formVisible, setFormVisible] = useState(false);

  const handleOpenForm = () => setFormVisible(true);
  const handleCloseForm = () => {
    setFormVisible(false);
    setEditingData(null);
    fetchSubmissions();
  };

  const [submissions, setSubmissions] = useState<any[]>([])
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSubmissionId, setCurrentSubmissionId] = useState(null);

  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, [handleCloseForm]);

  const handleEditButtonClick = (id: any) => {
    setEditingData(id); 
    setEditFormVisible(true);
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
      await deletePost(currentSubmissionId);
      setDialogOpen(false);
    }
  };

  const fetchSubmissions = async () => {
    const response = await fetch(`/api/submissions/getSubmissions`);
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
<Typography variant="h1" component="h1"       
      sx={{
        textAlign: 'center',
        fontSize: '2.5rem', // Customize the font size as needed
      }}>
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
                <Button
                  sx={{marginTop: 1}}
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditButtonClick(submission)}
                >
                  Edit
                </Button>
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
