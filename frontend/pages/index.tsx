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
    const [prioriteringslistaVisible, setPrioriteringslistaVisible] = useState(true);
    const [avslutadeVisible, setAvslutadeVisible] = useState(false);

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

    const togglePrioriteringslista = () => {
        setPrioriteringslistaVisible(true);
        setAvslutadeVisible(false);
    };

    const toggleAvslutade = () => {
        setPrioriteringslistaVisible(false);
        setAvslutadeVisible(true);
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
                        marginBottom: "1rem",
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

                <Button
                    sx={{ marginTop: 1, float: "right" }}
                    variant="contained"
                    color="primary"
                    onClick={toggleAvslutade}
                    disabled={avslutadeVisible}
                >
                    Avslutade
                </Button>

                <Button
                    sx={{ marginTop: 1, float: "right", marginRight: "1rem" }}
                    variant="contained"
                    color="primary"
                    onClick={togglePrioriteringslista}
                    disabled={prioriteringslistaVisible}
                >
                    Ej påbörjade / Pågående
                </Button>

                {prioriteringslistaVisible && (
                    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                        <Typography
                            variant="h2"
                            component="h2"
                            sx={{
                                textAlign: "left",
                                fontSize: "1.5rem", // Customize the font size as needed
                            }}
                        >
                            Ej påbörjade / Pågående
                        </Typography>
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
                )}

                {avslutadeVisible && (
                    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                        <Typography
                            variant="h2"
                            component="h2"
                            sx={{
                                textAlign: "left",
                                fontSize: "1.5rem", // Customize the font size as needed
                            }}
                        >
                            Avslutade
                        </Typography>
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
                )}
            </Container>
        </div>
    );
}
