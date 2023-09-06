export const capitalizeWords = (input:string)=>{
    const words = input.split("_");
    const capitalizeWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizeWords.join(" ");
}