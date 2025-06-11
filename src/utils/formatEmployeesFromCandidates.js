export const formatEmployeesFromCandidates = (candidates = []) => {
  return candidates
    .filter((c) => c.status === "Selected")
    .map((c) => ({
      profileImage: "/assets/userdefault.jpg",
      employeeName: c.candidateName,
      emailAddress: c.emailAddress,
      phoneNumber: c.phoneNumber,
      position: c.position,
      status: c.attendance || "Present",
      dateOfJoining:c.dateOfJoining || '-', 
      action: ["Edit", "Delete"],
    }));
};
