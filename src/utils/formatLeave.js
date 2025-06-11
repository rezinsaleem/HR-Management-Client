export const formatLeave = (candidates = []) => {
  return candidates
    .filter((c) => c.status === "Selected" && c.attendance === "Present")
    .map((c) => ({
      profileImage: "/assets/userdefault.jpg",
      employeeName: c.candidateName,
      employeeId: c._id,
      designation: c.position,
      document: c.document || '-',
      status: c.attendance ||"Pending", 
      reason: c.leaveReason || "-",
      dateOfLeave: c.dateOfLeave || "-",
    }));
};
export const formatLeaveData = (leaveRecords = []) => {
  return leaveRecords.map((leave) => ({
    profileImage: "/assets/userdefault.jpg?height=40&width=40",
    employeeName: leave.employeeName || "-",
    date: leave.dateOfLeave || "-", // use leave.dateOfLeave
    reason: leave.reason || "-",
    status: leave.status || "-",
    doc: leave.document || "", // if needed for file download later
    email:leave.emailAddress
  }));
};
