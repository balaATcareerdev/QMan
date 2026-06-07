const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjllNmViZDJjLWM2YmQtNGE4Mi1iNGRhLWZmNGZkMTI3N2MzZiIsImlhdCI6MTc4MDg1MTk3NywiZXhwIjoxNzgwODU1NTc3fQ.vtU1CB45SyYpSh65gcswRRLOKZTmQE-qBxUfWDJAJNU";

const body = {
  serviceName: "Lunch",
  description: "This is the Service for Lunch in HCL Tech",
  date: "2026-06-07T00:00:00.000Z",
};

async function createService() {
  const response = await fetch("http://localhost:4000/service/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return {
    status: response.status,
    data,
  };
}

const results = await Promise.all(
  Array.from({ length: 10 }, () => createService()),
);

console.log(JSON.stringify(results, null, 2));
