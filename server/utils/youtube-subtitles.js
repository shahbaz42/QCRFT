import youtubeCaptionsScraper from 'youtube-captions-scraper';
const fetchSubtitles = youtubeCaptionsScraper.getSubtitles;

const getSubtitles = async(videoID, {
    lang = 'en',
    timestamps = false,
    removeFormatting = false,
}) => {
    return new Promise( async(resolve, reject) => {
        try {
            if (timestamps) {
                const captions = await fetchSubtitles({videoID, lang});
                resolve(captions);
            } else {
                const captions = await fetchSubtitles({videoID, lang});
                let captionsText = "";
                captions.forEach(caption => {
                    captionsText += caption.text + " ";
                });

                if (removeFormatting) {
                    captionsText = captionsText.replace(/\[.*?\]/g, '');
                    captionsText = captionsText.trim();
                }
                resolve(captionsText);
            }
        } catch (error) {
            reject(error);
        }
    });
}

// code for testing
// const test = async() => {
//     try {
//         const options = {
//             timestamps: false,
//             removeFormatting: true,
//         };

//         const captions = await getSubtitles('ztE9TXFqwlY', options);
//         console.log(captions);
//     } catch (error) {
//         console.log(error);
//     }
// }
// test();

export default getSubtitles;