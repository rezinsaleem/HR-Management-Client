
export const formatCandidates = (candidates) => {
  return candidates.map((candidate, index) => ({
    srNo: String(index + 1).padStart(2, "0"),
    Id:candidate._id,
    candidateName: candidate.fullName,
    emailAddress: candidate.emailAddress,
    phoneNumber: candidate.phoneNumber,
    position: candidate.position,
    resume: candidate.resume,
    status: candidate.status || "New",
    experience: candidate.experience || "0",
    dateOfJoining: candidate.dateOfJoining || "N/A",
    action: ["Download Resume", "Delete Candidate"],
    attendance: candidate.attendance || 'Present',
  }));
};
