export const formatDate = (dateString) => {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        // If the date is invalid, return a fallback string or handle as needed
        return "Invalid Date"; // or return an empty string, etc.
    }

    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };

    // Return the formatted date as a string
    return date.toLocaleDateString('en-IN', options);
};