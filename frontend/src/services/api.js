export const runAgent = async (agentId, formData, patient) => {
  const response = await fetch(
    `http://localhost:5050/api/dna/run/${agentId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData, patient }),
    }
  );

  const data = await response.json();
  return data;
};