export async function deletePost(id: any): Promise<void> {
    if (id) {
        const response = await fetch(`/api/submissions/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) { 
            throw new Error('Failed to delete post'); 
        } 
        console.log('Delete post submitted successfully'); 
    }
}