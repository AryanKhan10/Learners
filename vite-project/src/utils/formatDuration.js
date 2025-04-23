// Convert seconds to HH:MM:SS format
    export const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);;

        return `${hours>0 ? hours+'h':''} ${minutes >0? minutes+'m':''} ${remainingSeconds}s`;
      };