const permissions = [
  { id: 0, role: "user" },
  { id: 1, role: "admin" },
];

const getPermissions = (permissionId) => {
  const map = {};
  permissions.forEach((per) => {
    if ((permissionId & per.id) === per.id) {
      map[per.role] = true;
    }
  });
  return map;
};

module.exports = {
  getPermissions,
};
