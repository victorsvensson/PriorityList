import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Modal, Container } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { submitPost } from '../services/postService';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const AddLinkForm = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const submission = { title, description, responsible, status, startDate, endDate };

    try {
      await submitPost(submission);
      //Reset the fields
      setTitle('');
      setDescription('');
      setResponsible('');
      setStatus('');
      setStartDate('');
      setEndDate('');
      onClose();

    }catch(error){
      console.log(error);
    }
  };

  return (
    <Modal
      open={isVisible}
      onClose={onClose}
      aria-labelledby="add-link-form-title"
      aria-describedby="add-link-form-description">
        
      <Box sx={style}>
        <Typography id="add-link-form-title" variant="h6" component="h2" textAlign="center">
          Add New Link
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="responsible-label">Responsible</InputLabel>
                <Select
                    labelId="responsible-label"
                    value={responsible}
                    label="Responsible"
                    onChange={(e) => setResponsible(e.target.value)}
                >
                    <MenuItem value="VISV">VISV</MenuItem>
                    <MenuItem value="MIAD">MIAD</MenuItem>
                </Select>
                </FormControl>
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                    labelId="status-label"
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="Not Started">Not started</MenuItem>
                    <MenuItem value="Started">Ongoing</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                </Select>
                </FormControl>
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
                label="Start Date"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                shrink: true,
                }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
          </Box>

          <TextField
            label="End Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button variant="contained" type="submit">Submit</Button>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddLinkForm;
