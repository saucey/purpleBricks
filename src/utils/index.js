const transformString = (inputString) => {
  return inputString
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .split(' ') // Split string into array of words
    .map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word except first
    .join(''); // Join array back into string
} 


const plusIcon = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="5" fill="#84329B" />
      <mask id="mask0_35_15486" mask-type="luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
        <rect width="32" height="32" rx="5" fill="white" />
      </mask>
      <g mask="url(#mask0_35_15486)">
        <path d="M27.4583 13.9167H18.0833V4.54167C18.0833 3.96615 17.6172 3.5 17.0417 3.5H14.9583C14.3828 3.5 13.9167 3.96615 13.9167 4.54167V13.9167H4.54167C3.96615 13.9167 3.5 14.3828 3.5 14.9583V17.0417C3.5 17.6172 3.96615 18.0833 4.54167 18.0833H13.9167V27.4583C13.9167 28.0339 14.3828 28.5 14.9583 28.5H17.0417C17.6172 28.5 18.0833 28.0339 18.0833 27.4583V18.0833H27.4583C28.0339 18.0833 28.5 17.6172 28.5 17.0417V14.9583C28.5 14.3828 28.0339 13.9167 27.4583 13.9167Z" fill="white" />
      </g>
    </svg>
  )
}

const minusIcon = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="5" fill="#84329B" />
      <mask id="mask0_35_15487" mask-type="luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
        <rect width="32" height="32" rx="5" fill="white" />
      </mask>
      <g mask="url(#mask0_35_15487)">
        <path d="M27.4583 13.9492H4.54167C3.96615 13.9492 3.5 14.4154 3.5 14.9909V17.0742C3.5 17.6497 3.96615 18.1159 4.54167 18.1159H27.4583C28.0339 18.1159 28.5 17.6497 28.5 17.0742V14.9909C28.5 14.4154 28.0339 13.9492 27.4583 13.9492Z" fill="white" />
      </g>
    </svg>
  )
}

const liveLocationIcon = () => { 
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="5" fill="#84329B" />
      <mask id="mask0_35_15488" mask-type="luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
        <rect width="32" height="32" rx="5" fill="white" />
      </mask>
      <g mask="url(#mask0_35_15488)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.7188 14.4375H25.2344C24.5747 10.5146 21.4854 7.42529 17.5625 6.76562V4.28125C17.5625 3.84961 17.2129 3.5 16.7812 3.5H15.2188C14.7871 3.5 14.4375 3.84961 14.4375 4.28125V6.76562C10.5146 7.42529 7.42529 10.5146 6.76562 14.4375H4.28125C3.84961 14.4375 3.5 14.7871 3.5 15.2188V16.7812C3.5 17.2129 3.84961 17.5625 4.28125 17.5625H6.76562C7.42529 21.4854 10.5146 24.5747 14.4375 25.2344V27.7188C14.4375 28.1504 14.7871 28.5 15.2188 28.5H16.7812C17.2129 28.5 17.5625 28.1504 17.5625 27.7188V25.2344C21.4854 24.5747 24.5747 21.4854 25.2344 17.5625H27.7188C28.1504 17.5625 28.5 17.2129 28.5 16.7812V15.2188C28.5 14.7871 28.1504 14.4375 27.7188 14.4375ZM16 22.25C12.5479 22.25 9.75 19.4517 9.75 16C9.75 12.5483 12.5479 9.75 16 9.75C19.4521 9.75 22.25 12.5483 22.25 16C22.25 19.4517 19.4521 22.25 16 22.25ZM11.7031 16C11.7031 13.627 13.627 11.7031 16 11.7031C18.373 11.7031 20.2969 13.627 20.2969 16C20.2969 18.373 18.373 20.2969 16 20.2969C13.627 20.2969 11.7031 18.373 11.7031 16Z" fill="white" />
      </g>
    </svg>
  )
}


export { transformString, plusIcon, minusIcon, liveLocationIcon }