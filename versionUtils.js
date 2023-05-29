function incrementVersion(version) {
  const versionParts = version.split(".");
  let carry = true;

  for (let i = versionParts.length - 1; i >= 0; i--) {
    if (carry) {
      const currentValue = parseInt(versionParts[i]);
      if (currentValue === 9) {
        versionParts[i] = "0";
        carry = true;
      } else {
        versionParts[i] = (currentValue + 1).toString();
        carry = false;
      }
    }
  }

  return versionParts.join(".");
}

module.exports = {
  incrementVersion,
};
