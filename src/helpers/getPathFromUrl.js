const getPathFromUrl = (inputImg) => {
    if (inputImg === null) {
      return null;
    }
  
    try {
      const parsedUrl = new URL(inputImg);
      return parsedUrl.pathname.split('/').pop();
    } catch (e) {
      return inputImg.split('/').pop();
    }
  };
  
  export default getPathFromUrl;  