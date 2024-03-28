export async function editPost(formData: any, initialData: any): Promise<void> {
    const response = await fetch(`/api/submissions/${initialData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('Failed to edit post');
    }

    console.log('Edit post submitted successfully');
};