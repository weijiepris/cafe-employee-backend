const generateUUID = (length) => {
  let result = "";
  const characters = "0123456789abcdef";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

const generateEmployeeUUID = () => {
  const uuid = `UI${generateUUID(7)}`;
  return uuid;
};

const generateCafeUUID = () => {
  const uuid = `${generateUUID(8)}-${generateUUID(4)}-${generateUUID(4)}-${generateUUID(4)}-${generateUUID(12)}`;
  return uuid;
};

module.exports = { generateEmployeeUUID, generateCafeUUID };
