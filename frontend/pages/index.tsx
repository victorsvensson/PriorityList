import React, { useEffect, useState } from "react";
import AddLinkForm from "../components/AddLinkForm";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    Button,
    Typography,
} from "@mui/material";
import EditLinkForm from "../components/EditLinkForm";

export default function Home() {
    const [formVisible, setFormVisible] = useState(false);
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [editingData, setEditingData] = useState(null);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        const response = await fetch(`/api/submissions/getSubmissions`);
        const data = await response.json();
        setSubmissions(data);
    };

    const handleOpenForm = () => setFormVisible(true);

    const handleCloseForm = () => {
        setFormVisible(false);
        setEditingData(null);
        fetchSubmissions();
    };

    const handleEditButtonClick = (submission: any) => {
        setEditingData(submission);
        setEditFormVisible(true);
    };

    const handleCloseDialog = () => {
        setEditFormVisible(false);
        fetchSubmissions();
    };

    return (
        <div>
            {editFormVisible && (
                <EditLinkForm
                    isVisible={editFormVisible}
                    initialData={editingData}
                    onClose={handleCloseDialog}
                />
            )}
            <Container>
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        textAlign: "center",
                        fontSize: "2.5rem", // Customize the font size as needed
                    }}
                >
                    Prioriteringslista klientgruppen
                </Typography>
                <Button
                    sx={{ marginTop: 1 }}
                    variant="contained"
                    color="success"
                    onClick={handleOpenForm}
                >
                    New
                </Button>

                <AddLinkForm isVisible={formVisible} onClose={handleCloseForm} />

                <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                    <Table aria-label="submissions table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Responsible</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {submissions
                                .filter((submission) => submission.status !== "Completed")
                                .map((submission, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{submission.title}</TableCell>
                                        <TableCell>{submission.description}</TableCell>
                                        <TableCell>{submission.responsible}</TableCell>
                                        <TableCell>{submission.status}</TableCell>
                                        <TableCell>{submission.startDate}</TableCell>
                                        <TableCell>{submission.endDate}</TableCell>
                                        <TableCell>
                                            <Button
                                                sx={{ marginTop: 1 }}
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
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        textAlign: "center",
                        fontSize: "2.5rem",
                        marginTop: 4,
                    }}
                >
                    Avslutade
                </Typography>
                <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                    <Table aria-label="completed submissions table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Responsible</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {submissions
                                .filter((submission) => submission.status === "Completed")
                                .map((submission, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{submission.title}</TableCell>
                                        <TableCell>{submission.description}</TableCell>
                                        <TableCell>{submission.responsible}</TableCell>
                                        <TableCell>{submission.status}</TableCell>
                                        <TableCell>{submission.startDate}</TableCell>
                                        <TableCell>{submission.endDate}</TableCell>
                                        <TableCell>
                                            <Button
                                                sx={{ marginTop: 1 }}
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
