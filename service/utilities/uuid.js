const generateEmployeeUUID = () => {
  const generateRandomHex = (length) => {
    let result = "";
    const characters = "0123456789abcdef";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };
  const uuid = `UI${generateRandomHex(7)}`;
  return uuid;
};

const generateCafeUUID = () => {
  const generateRandomHex = (length) => {
    let result = "";
    const characters = "0123456789abcdef";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };
  const uuid = `${generateRandomHex(8)}-${generateRandomHex(
    4
  )}-${generateRandomHex(4)}-${generateRandomHex(4)}-${generateRandomHex(12)}`;
  return uuid;
};

module.exports = { generateEmployeeUUID, generateCafeUUID };
