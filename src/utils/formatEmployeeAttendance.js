export const formatEmployeeAttendance = (candidates = []) => {
  return candidates
    .filter((c) => c.status === "Selected")
    .map((c) => ({
      profileImage: "/assets/userdefault.jpg",
      employeeName: c.candidateName,
      position: c.position,
      emailAddress: c.emailAddress,
      task: 'Dashboard Login page design, Dashboard Home page design ',
      attendance: c.attendance,
    }));
};
