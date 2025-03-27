export const getBase64ImageFromURL = async (url) => {

  try{
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  catch (error) {
    console.error("Failed to load image:", error);
    return null;
  }
};