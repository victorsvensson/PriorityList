interface FormSubmissionData {
    title: string;
    description: string;
    responsible: string;
    startDate: string;
    endDate: string;
  }

  export async function submitPost(data: FormSubmissionData): Promise<void> {
    const response = await fetch('/api/postSubmission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to submit post');
    }
  
    console.log('Post submitted successfully');
  }
  