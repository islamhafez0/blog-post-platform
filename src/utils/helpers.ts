export const customizeFirebaseErrors = (errorCode: string) => {
  switch(errorCode) {
    case 'auth/invalid-credential':
      return "Invalid credentials. Please try again.";
    case 'auth/too-many-requests':
      return "Access to this account has been temporarily disabled due to many failed login attempts."
    case 'auth/user-not-found':
      return "No user account found with this email."
      case 'auth/invalid-password':
        return "Incorrect password. Please try again."
      case 'auth/email-already-in-use':
        return "This email is already in use. Please use a different email."
      case 'auth/weak-password':
        return "Password should be at least 6 characters."
      case 'auth/argument-error':
        return "This authentication method is not allowed."
      case 'auth/unauthorized-domain': 
        return "Unauthorized Domain";
      case 'auth/popup-closed-by-user':
        return "Popup closed by user. Please try again."
    default: 
      return "An unexpected error occured. Please try again"
  }
}

export const handleShowingTags = (string: string) => {
  return string.split(",").map((tag) => tag.trim()).filter(tag => tag);
}

interface Timestamp {
  nanoseconds: number;
  seconds: number;
}

export const formatDateFromTimestamp = (timestamp: Timestamp): string => {
  const date = new Date(timestamp.seconds * 1000);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export const formatCommentsTimestamp = (timestamp: Timestamp): string => {
  if (!timestamp || !timestamp.seconds || !timestamp.nanoseconds) return "";

  const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  const secondsElapsed = Math.floor((Date.now() - milliseconds) / 1000);
  if (secondsElapsed < 60) {
    return secondsElapsed <= 1 ? "Just now" : `${secondsElapsed} seconds ago`;
  }
  const minutesElapsed = Math.floor(secondsElapsed / 60);
  if (minutesElapsed < 60) {
    return minutesElapsed === 1 ? "1 minute ago" : `${minutesElapsed} minutes ago`;
  }
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  if (hoursElapsed < 24) {
    return hoursElapsed === 1 ? "1 hour ago" : `${hoursElapsed} hours ago`;
  }
  const daysElapsed = Math.floor(hoursElapsed / 24);
  if (daysElapsed < 30) {
    return daysElapsed === 1 ? "1 day ago" : `${daysElapsed} days ago`;
  }
  const monthsElapsed = Math.floor(daysElapsed / 30);
  if (monthsElapsed < 12) {
    return monthsElapsed === 1 ? "1 month ago" : `${monthsElapsed} months ago`;
  }
  const yearsElapsed = Math.floor(daysElapsed / 365);
  return yearsElapsed === 1 ? "1 year ago" : `${yearsElapsed} years ago`;
};

export const containsArabicCharacters = (text: string) => {
  const arabicCharacters = /[ابتثجحخدذرزسشصضطظعغفقكلمنهويءآٱأإةؤئى؟٠١٢٣٤٥٦٧٨٩٬٫]/;
  return arabicCharacters.test(text)
}

export const getColorForLetter = (letter: string): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const index = letters.indexOf(letter.toUpperCase());
  const colors = [
    '#FF6347', '#FF4500', '#FFD700', '#ADFF2F', '#7FFF00',
    '#00FA9A', '#00CED1', '#1E90FF', '#8A2BE2', '#FF69B4',
    '#D2691E', '#DC143C', '#FF1493', '#FF4500', '#D8BFD8',
    '#FF6347', '#40E0D0', '#FF8C00', '#F08080', '#E6E6FA'
  ];
  return colors[index % colors.length];
};
