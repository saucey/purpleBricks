const transformString = (inputString) => {
  return inputString
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .split(' ') // Split string into array of words
    .map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word except first
    .join(''); // Join array back into string
} 

export { transformString }