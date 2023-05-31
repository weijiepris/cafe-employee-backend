const generateUUID = () => {
  // Generate a random hexadecimal string of the specified length
  function generateRandomHex(length) {
    let result = "";
    const characters = "0123456789abcdef";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  // Generate four random hexadecimal strings separated by hyphens
  const uuid = `${generateRandomHex(8)}-${generateRandomHex(4)}-${generateRandomHex(4)}-${generateRandomHex(4)}-${generateRandomHex(12)}`;
  return uuid;
};

module.exports = { generateUUID };
