import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Modal, Container } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditLinkForm = ({ isVisible, mode, initialData, onClose }: { isVisible: boolean, mode: string, initialData: any, onClose: () => void }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

    // If the form is in edit mode, initialize state with initialData
    useEffect(() => {
      if (mode === 'edit' && initialData) {
        setTitle(initialData.title);
        setDescription(initialData.description);
        setResponsible(initialData.responsible);
        setStartDate(initialData.startDate);
        setEndDate(initialData.endDate);
      }
    }, [mode, initialData]);

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const formData = { title, description, responsible, startDate, endDate };
  
      if (mode === 'edit') {
        // Call your API to update the existing submission
        await fetch(`/api/submissions/${initialData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Call your API to add a new submission
        await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
  
      // Close the form and refresh/re-fetch submissions data
      onClose();
    };

  return (
    <Modal
    open={isVisible}
    onClose={onClose}
    aria-labelledby="edit-link-form-modal"
    aria-describedby="edit-link-form-modal-description"
  >
    <Container maxWidth="sm" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
      <Typography variant="h6" id="edit-link-form-modal-title">
        {mode === 'edit' ? 'Edit Link' : 'Add New Link'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="responsible-label">Responsible</InputLabel>
          <Select
            labelId="responsible-label"
            id="responsible"
            value={responsible}
            label="Responsible"
            onChange={(e) => setResponsible(e.target.value)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="John Doe">John Doe</MenuItem>
            <MenuItem value="Jane Doe">Jane Doe</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="start-date"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="end-date"
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {mode === 'edit' ? 'Save Changes' : 'Add Link'}
        </Button>
      </Box>
    </Container>
  </Modal>
  )
}

export default EditLinkForm
